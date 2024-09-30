"use client"

import DeleteButton from "@/components/Forms/DeleteButton"
import "primeicons/primeicons.css"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { ConfirmDialog } from "primereact/confirmdialog"
import { DataTable, DataTableFilterMeta } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { Skeleton } from "primereact/skeleton"
import { Toast } from "primereact/toast"
import { Toolbar } from "primereact/toolbar"
import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/navbar"
import "primereact/resources/themes/lara-light-cyan/theme.css"

type Sport = {
    id: string | null
    name: string
    createdAt?: Date
    updatedAt?: Date
}

export default function Sports() {
    const [loading, setLoading] = useState<boolean>(true)
    const [sports, setSports] = useState<Sport[]>([])
    const [sportDialog, setSportDialog] = useState<boolean>(false)
    const [sport, setSport] = useState<Sport>({
        id: null,
        name: "",
    })
    const [submitted, setSubmitted] = useState<boolean>(false)
    const toast = useRef<Toast>(null)

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        name: { value: null, matchMode: "contains" },
        createdAt: { value: null, matchMode: "contains" },
        updatedAt: { value: null, matchMode: "contains" },
    })

    const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const newFilters: any = { ...filters }
        newFilters[field].value = e.target.value
        setFilters(newFilters)
    }

    const getAuthToken = () => {
        return localStorage.getItem("authToken") || ""
    }

    useEffect(() => {
        fetchSport()
        setLoading(false)
    }, [])

    const fetchSport = async () => {
        try {
            const response = await fetch("/api/sports/list", {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            })
            const data = await response.json()
            setSports(data)
        } catch (error) {
            console.error("Erro ao buscar Esportes:", error)
            toast.current?.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao buscar Esportes",
                life: 3000,
            })
        }
    }

    const leftToolbarTemplate = () => {
        return (
            <div className="flex justify-between w-full">
                <Button label="Novo" icon="pi pi-user-plus" className="p-button-success" onClick={openNew} />
            </div>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <div className="flex justify-between w-full">
                <InputText
                    id="globalFilter"
                    placeholder="Pesquisar"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFilters({ ...filters, global: { value: e.target.value, matchMode: "contains" } })
                    }
                    className="ml-2"
                />
            </div>
        )
    }

    const openNew = () => {
        setSport({ id: null, name: "" })
        setSubmitted(false)
        setSportDialog(true)
    }

    const hideDialog = () => {
        setSubmitted(false)
        setSportDialog(false)
    }

    const saveSport = async () => {
        setSubmitted(true)

        if (sport.name.trim()) {
            let _sport = [...sports]
            try {
                console.log("Payload enviado:", JSON.stringify(sport))

                const isUpdating = !!sport.id

                // Filtra os campos proibidos antes de enviar
                const { id, createdAt, updatedAt, ...sportData } = sport

                const response = await fetch(isUpdating ? `/api/sports/update/${sport.id}` : "/api/sports/create", {
                    method: isUpdating ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAuthToken()}`,
                    },
                    body: JSON.stringify(isUpdating ? sportData : { name: sport.name }),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    const errorMessage = errorData.error || "Erro ao salvar Equipamento"
                    throw new Error(errorMessage)
                }

                const result = await response.json()
                if (!isUpdating) {
                    _sport.push(result)
                } else {
                    _sport[_sport.findIndex((g) => g.id === sport.id)] = result
                }

                toast.current?.show({
                    severity: "success",
                    summary: "Sucesso",
                    detail: isUpdating ? "Equipamento atualizado com sucesso" : "Equipamento criado com sucesso",
                    life: 3000,
                })
                setSports(_sport)
                setSportDialog(false)
                setSport({ id: null, name: "" })
            } catch (error) {
                console.error("Erro ao salvar Equipamento:", error)
                const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao salvar Equipamento"
                toast.current?.show({
                    severity: "error",
                    summary: "Erro",
                    detail: errorMessage,
                    life: 4000,
                })
            }
        } else {
            toast.current?.show({
                severity: "warn",
                summary: "Atenção",
                detail: "Preencha todos os campos obrigatórios.",
                life: 3000,
            })
        }
    }

    const editSport = (sport: Sport) => {
        setSport({ ...sport })
        setSportDialog(true)
    }

    const deleteSport = async (sport: Sport) => {
        try {
            const response = await fetch(`/api/sports/delete/${sport.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            })

            if (response.ok) {
                let _sport = sports.filter((val) => val.id !== sport.id)
                setSports(_sport)
                toast.current?.show({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Equipamento deletado com sucesso",
                    life: 3000,
                })
            } else {
                throw new Error("Erro ao deletar Equipamento")
            }
        } catch (error) {
            console.error("Erro ao deletar Equipamento:", error)
            toast.current?.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao deletar Equipamento",
                life: 3000,
            })
        }
    }

    const sportDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-danger" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-success" onClick={saveSport} />
        </>
    )

    if (loading) {
        return <Skeleton shape="rectangle" width="100%" height="100vh" />
    }

    return (
        <>
            <Navbar />
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="p-mb-4 p-toolbar" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable
                    filters={filters}
                    onFilter={(e) => setFilters(e.filters as DataTableFilterMeta)}
                    globalFilterFields={["name", "createdAt", "updatedAt"]}
                    header="Esportes"
                    style={{
                        width: "100%",
                        overflow: "auto",
                        border: "1px solid #ccc",
                    }}
                    value={sports}
                    paginator
                    rows={7}
                    rowsPerPageOptions={[7, 10, 25, 50]}
                >
                    <Column align="center" field="name" header="Tipo" sortable></Column>
                    <Column
                        align="center"
                        field="createdAt"
                        header="Data de Criação"
                        body={(rowData) => {
                            const date = new Date(rowData.createdAt)
                            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                        }}
                        sortable
                    ></Column>
                    <Column
                        align="center"
                        field="updatedAt"
                        header="Data de Atualização"
                        body={(rowData) => {
                            const date = new Date(rowData.updatedAt)
                            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                        }}
                        sortable
                    ></Column>
                    <Column
                        align="center"
                        body={(rowData: Sport) => (
                            <>
                                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                                    <Button
                                        icon="pi pi-pencil"
                                        className="p-button-rounded p-button-success mr-2"
                                        onClick={() => editSport(rowData)}
                                    />
                                    <DeleteButton
                                        item={rowData}
                                        onDelete={deleteSport}
                                        message={`Você tem certeza que deseja deletar o sporto ${rowData.name}?`}
                                        header="Confirmação"
                                    />
                                </div>
                            </>
                        )}
                    />
                </DataTable>

                <Dialog
                    visible={sportDialog}
                    style={{ width: "450px" }}
                    draggable={false}
                    header="Detalhes do Equipamento"
                    modal
                    className="p-fluid"
                    footer={sportDialogFooter}
                    onHide={hideDialog}
                >
                    <div
                        className="field"
                        style={{
                            marginTop: "10px",
                        }}
                    >
                        <label htmlFor="description">Tipo de Equipamento</label>
                        <InputText
                            id="description"
                            value={sport.name}
                            onChange={(e) => setSport({ ...sport, name: e.target.value })}
                            style={{
                                marginTop: "10px",
                            }}
                            required
                            className={submitted && !sport.name ? "p-invalid" : ""}
                        />
                    </div>
                </Dialog>
                <ConfirmDialog />
            </div>
        </>
    )
}
