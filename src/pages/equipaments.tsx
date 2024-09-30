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

type Equipament = {
    id: string | null
    name: string
    createdAt?: Date
    updatedAt?: Date
}

export default function Equipaments() {
    const [loading, setLoading] = useState<boolean>(true)
    const [equipaments, setEquipaments] = useState<Equipament[]>([])
    const [courtTypeDialog, setEquipamentDialog] = useState<boolean>(false)
    const [courtType, setEquipament] = useState<Equipament>({
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
        fetchEquipament()
        setLoading(false)
    }, [])

    const fetchEquipament = async () => {
        try {
            const response = await fetch("/api/equipments/list", {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            })
            const data = await response.json()
            setEquipaments(data)
        } catch (error) {
            console.error("Erro ao buscar Equipamentos:", error)
            toast.current?.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao buscar Equipamentos",
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
        setEquipament({ id: null, name: "" })
        setSubmitted(false)
        setEquipamentDialog(true)
    }

    const hideDialog = () => {
        setSubmitted(false)
        setEquipamentDialog(false)
    }

    const saveEquipament = async () => {
        setSubmitted(true)

        if (courtType.name.trim()) {
            let _equipament = [...equipaments]
            try {
                console.log("Payload enviado:", JSON.stringify(courtType))

                const isUpdating = !!courtType.id

                // Filtra os campos proibidos antes de enviar
                const { id, createdAt, updatedAt, ...equipamentData } = courtType

                const response = await fetch(isUpdating ? `/api/equipments/update/${courtType.id}` : "/api/equipments/create", {
                    method: isUpdating ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAuthToken()}`,
                    },
                    body: JSON.stringify(isUpdating ? equipamentData : { name: courtType.name }),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    const errorMessage = errorData.error || "Erro ao salvar Equipamento"
                    throw new Error(errorMessage)
                }

                const result = await response.json()
                if (!isUpdating) {
                    _equipament.push(result)
                } else {
                    _equipament[_equipament.findIndex((g) => g.id === courtType.id)] = result
                }

                toast.current?.show({
                    severity: "success",
                    summary: "Sucesso",
                    detail: isUpdating ? "Equipamento atualizado com sucesso" : "Equipamento criado com sucesso",
                    life: 3000,
                })
                setEquipaments(_equipament)
                setEquipamentDialog(false)
                setEquipament({ id: null, name: "" })
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

    const editEquipament = (courtType: Equipament) => {
        setEquipament({ ...courtType })
        setEquipamentDialog(true)
    }

    const deleteEquipament = async (courtType: Equipament) => {
        try {
            const response = await fetch(`/api/equipments/delete/${courtType.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            })

            if (response.ok) {
                let _equipament = equipaments.filter((val) => val.id !== courtType.id)
                setEquipaments(_equipament)
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

    const courtTypeDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-danger" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-success" onClick={saveEquipament} />
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
                    header="Equipamentos"
                    style={{
                        width: "100%",
                        overflow: "auto",
                        border: "1px solid #ccc",
                    }}
                    value={equipaments}
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
                        body={(rowData: Equipament) => (
                            <>
                                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                                    <Button
                                        icon="pi pi-pencil"
                                        className="p-button-rounded p-button-success mr-2"
                                        onClick={() => editEquipament(rowData)}
                                    />
                                    <DeleteButton
                                        item={rowData}
                                        onDelete={deleteEquipament}
                                        message={`Você tem certeza que deseja deletar o equipamento ${rowData.name}?`}
                                        header="Confirmação"
                                    />
                                </div>
                            </>
                        )}
                    />
                </DataTable>

                <Dialog
                    visible={courtTypeDialog}
                    style={{ width: "450px" }}
                    draggable={false}
                    header="Detalhes do Equipamento"
                    modal
                    className="p-fluid"
                    footer={courtTypeDialogFooter}
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
                            value={courtType.name}
                            onChange={(e) => setEquipament({ ...courtType, name: e.target.value })}
                            style={{
                                marginTop: "10px",
                            }}
                            required
                            className={submitted && !courtType.name ? "p-invalid" : ""}
                        />
                    </div>
                </Dialog>
                <ConfirmDialog />
            </div>
        </>
    )
}
