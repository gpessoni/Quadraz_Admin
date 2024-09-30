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
import { Dropdown } from "primereact/dropdown" // Dropdown importada para seleção de esporte

type sport = {
    id: string
    name: string
}

type sportType = {
    id: string | null
    name: string
    heightOfficial?: number
    widthOfficial?: number
    createdAt?: Date
    updatedAt?: Date
    sportId: any
    sport?: sport
}

export default function SportType() {
    const [loading, setLoading] = useState<boolean>(true)
    const [courtsType, setCourtsType] = useState<sportType[]>([])
    const [courtTypeDialog, setCourtTypeDialog] = useState<boolean>(false)
    const [courtType, setCourtType] = useState<sportType>({
        id: null,
        name: "",
        heightOfficial: 0,
        widthOfficial: 0,
        sportId: "",
    })
    const [sports, setSports] = useState<sport[]>([]) // Estado para os esportes
    const [submitted, setSubmitted] = useState<boolean>(false)
    const toast = useRef<Toast>(null)

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        name: { value: null, matchMode: "contains" },
        createdAt: { value: null, matchMode: "contains" },
        updatedAt: { value: null, matchMode: "contains" },
    })

    useEffect(() => {
        fetchCourtsType()
        fetchSports()
        setLoading(false)
    }, [])

    const getAuthToken = () => {
        return localStorage.getItem("authToken") || ""
    }

    const fetchCourtsType = async () => {
        try {
            const response = await fetch("/api/sport-type/list", {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            })
            const data = await response.json()
            setCourtsType(data)
        } catch (error) {
            console.error("Erro ao buscar Tipos de Esportes:", error)
            toast.current?.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao buscar Tipos de Esportes",
                life: 3000,
            })
        }
    }

    const fetchSports = async () => {
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

    const openNew = () => {
        setCourtType({ id: null, name: "", heightOfficial: undefined, widthOfficial: undefined, sportId: "" })
        setSubmitted(false)
        setCourtTypeDialog(true)
    }

    const hideDialog = () => {
        setSubmitted(false)
        setCourtTypeDialog(false)
    }

    const saveCourtType = async () => {
        setSubmitted(true)

        if (courtType.name.trim() && courtType.sportId) {
            let _courtsType = [...courtsType]
            try {
                const isUpdating = !!courtType.id
                let payload: any = {
                    name: courtType.name,
                    heightOfficial: courtType.heightOfficial,
                    widthOfficial: courtType.widthOfficial,
                }

                if (!isUpdating) {
                    payload.sportId = courtType.sportId.id
                }

                const response = await fetch(isUpdating ? `/api/sport-type/update/${courtType.id}` : "/api/sport-type/create", {
                    method: isUpdating ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAuthToken()}`,
                    },
                    body: JSON.stringify(payload),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    const errorMessage = errorData.error || "Erro ao salvar Tipo de Esporte"
                    throw new Error(errorMessage)
                }

                const result = await response.json()
                if (!isUpdating) {
                    _courtsType.push(result)
                } else {
                    _courtsType[_courtsType.findIndex((g) => g.id === courtType.id)] = result
                }

                toast.current?.show({
                    severity: "success",
                    summary: "Sucesso",
                    detail: isUpdating ? "Tipo de Esporte atualizado com sucesso" : "Tipo de Esporte criado com sucesso",
                    life: 3000,
                })
                setCourtsType(_courtsType)
                setCourtTypeDialog(false)
                setCourtType({ id: null, name: "", heightOfficial: undefined, widthOfficial: undefined, sportId: "" })
                fetchCourtsType()
            } catch (error) {
                console.error("Erro ao salvar Tipo de Esporte:", error)
                const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao salvar Tipo de Esporte"
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

    const editCourtType = (courtType: sportType) => {
        setCourtType({ ...courtType })
        setCourtTypeDialog(true)
    }

    const deleteCourtType = async (courtType: sportType) => {
        try {
            const response = await fetch(`/api/sport-type/delete/${courtType.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            })

            if (response.ok) {
                let _courtsType = courtsType.filter((val) => val.id !== courtType.id)
                setCourtsType(_courtsType)
                toast.current?.show({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Tipo de Esporte deletado com sucesso",
                    life: 3000,
                })
            } else {
                throw new Error("Erro ao deletar Tipo de Esporte")
            }
        } catch (error) {
            console.error("Erro ao deletar Tipo de Esporte:", error)
            toast.current?.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao deletar Tipo de Esporte",
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

    const courtTypeDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-danger" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-success" onClick={saveCourtType} />
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
                    header="Tipos de Esportes"
                    style={{
                        width: "100%",
                        overflow: "auto",
                        border: "1px solid #ccc",
                    }}
                    value={courtsType}
                    paginator
                    rows={7}
                    rowsPerPageOptions={[7, 10, 25, 50]}
                >
                    <Column align="center" field="name" header="Tipo" sortable></Column>
                    <Column align="center" field="heightOfficial" header="Altura Oficial" sortable></Column>
                    <Column align="center" field="widthOfficial" header="Largura Oficial" sortable></Column>
                    <Column align="center" field="sport.name" header="Esporte" sortable></Column>
                    <Column
                        align="center"
                        body={(rowData: sportType) => (
                            <>
                                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                                    <Button
                                        icon="pi pi-pencil"
                                        className="p-button-rounded p-button-success mr-2"
                                        onClick={() => editCourtType(rowData)}
                                    />
                                    <DeleteButton
                                        item={rowData}
                                        onDelete={deleteCourtType}
                                        message={`Você tem certeza que deseja deletar o tipo de esporte ${rowData.name}?`}
                                        header="Confirmação"
                                    />
                                </div>
                            </>
                        )}
                    />{" "}
                </DataTable>

                <Dialog
                    visible={courtTypeDialog}
                    style={{ width: "450px" }}
                    header="Tipo de Esporte"
                    draggable={false}
                    modal
                    className="p-fluid"
                    footer={courtTypeDialogFooter}
                    onHide={hideDialog}
                >
                    <div className="field" style={{ marginBottom: "1rem" }}>
                        <label htmlFor="name">Nome</label>
                        <InputText
                            id="name"
                            value={courtType.name}
                            onChange={(e) => setCourtType({ ...courtType, name: e.target.value })}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="field" style={{ marginBottom: "1rem" }}>
                        <label htmlFor="heightOfficial">Altura Oficial</label>
                        <InputText
                            id="heightOfficial"
                            value={courtType.heightOfficial?.toString() || "0"}
                            onChange={(e) => setCourtType({ ...courtType, heightOfficial: parseFloat(e.target.value) })}
                        />
                    </div>

                    <div className="field" style={{ marginBottom: "1rem" }}>
                        <label htmlFor="widthOfficial">Largura Oficial</label>
                        <InputText
                            id="widthOfficial"
                            value={courtType.widthOfficial?.toString() || "0"}
                            onChange={(e) => setCourtType({ ...courtType, widthOfficial: parseFloat(e.target.value) })}
                        />
                    </div>

                    {!courtType.id && (
                        <div className="field" style={{ marginBottom: "1rem" }}>
                            <label htmlFor="sport">Esporte</label>
                            <Dropdown
                                id="sport"
                                value={courtType.sportId}
                                options={sports}
                                onChange={(e) => setCourtType({ ...courtType, sportId: e.value })}
                                optionLabel="name"
                                placeholder="Selecione um Esporte"
                            />
                        </div>
                    )}
                </Dialog>

                <ConfirmDialog />
            </div>
        </>
    )
}
