"use client"

import DeleteButton from "@/components/Forms/DeleteButton"
import "primeicons/primeicons.css"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { ConfirmDialog } from "primereact/confirmdialog"
import { DataTable, DataTableFilterMeta } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { InputMask } from "primereact/inputmask"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { Skeleton } from "primereact/skeleton"
import { Toast } from "primereact/toast"
import { Toolbar } from "primereact/toolbar"
import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/navbar"
import "primereact/resources/themes/lara-light-cyan/theme.css"

type SportsCenter = {
    id: string | null
    name: string
    address: string
    description?: string
    cep?: string
    logo?: string
    Court?: any
    neighborhood: string
    number: string
    city: string
    state: string
    country: string
    email: string
    phone: string
    hasWifi: boolean
    hasParking: boolean
    playgroundObs?: string
    wifiPassword?: string
    parkingCapacity: number
    opensOnHolidays: boolean
    hasPlayground: boolean
    createdAt?: Date
    updatedAt?: Date
}

export default function SportsCenters() {
    const [loading, setLoading] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState(false)

    const [logo, setLogo] = useState(null as any)

    const [selectedSportsCenter, setSelectedSportsCenter] = useState<SportsCenter | null>(null)
    const [DetailsSportCenterDialog, setDetailsSportCenterDialog] = useState(false)

    const [sportsCenters, setSportsCenters] = useState<SportsCenter[]>([])
    const [sportsCenterDialog, setSportsCenterDialog] = useState<boolean>(false)
    const [sportsCenter, setSportsCenter] = useState<SportsCenter>({
        id: null,
        name: "",
        address: "",
        neighborhood: "",
        logo: "",
        number: "",
        city: "",
        state: "",
        country: "",
        email: "",
        phone: "",
        hasWifi: false,
        hasParking: false,
        parkingCapacity: 0,
        opensOnHolidays: false,
        hasPlayground: false,
    })
    const [submitted, setSubmitted] = useState<boolean>(false)
    const toast = useRef<Toast>(null)

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        name: { value: null, matchMode: "contains" },
        city: { value: null, matchMode: "contains" },
        state: { value: null, matchMode: "contains" },
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
        fetchSportsCenters()
        setLoading(false)
    }, [])

    const fetchSportsCenters = async () => {
        try {
            const response = await fetch("/api/sports-center/list", {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            })
            const data = await response.json()
            setSportsCenters(data)
        } catch (error) {
            console.error("Erro ao buscar Centros Esportivos:", error)
            toast.current?.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao buscar Centros Esportivos",
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

    const handleImageChange = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogo(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const openNew = () => {
        setSportsCenter({
            id: null,
            name: "",
            address: "",
            neighborhood: "",
            number: "",
            city: "",
            state: "",
            country: "",
            email: "",
            phone: "",
            hasWifi: false,
            hasParking: false,
            parkingCapacity: 0,
            opensOnHolidays: false,
            hasPlayground: false,
        })
        setSubmitted(false)
        setSportsCenterDialog(true)
    }

    const hideDialog = () => {
        setSubmitted(false)
        setSportsCenterDialog(false)
        setDetailsSportCenterDialog(false)
    }

    const saveSportsCenter = async () => {
        setSubmitted(true)

        if (sportsCenter.name.trim()) {
            let _sportsCenter = [...sportsCenters]

            try {
                console.log("Payload enviado:", JSON.stringify(sportsCenter))

                const isUpdating = !!sportsCenter.id

                // Extraindo apenas os campos válidos
                const { id, cep, createdAt, updatedAt, description, wifiPassword, playgroundObs, Court, ...sportsCenterData } = sportsCenter

                // Certificando-se que o logo está no formato Base64 ou o formato esperado
                if (logo && logo.startsWith("data:image/")) {
                    sportsCenterData.logo = logo.split(",")[1] // Remove o prefixo "data:image/png;base64,"
                }

                const response = await fetch(isUpdating ? `/api/sports-center/update/${sportsCenter.id}` : "/api/sports-center/create", {
                    method: isUpdating ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getAuthToken()}`,
                    },
                    body: JSON.stringify(sportsCenterData), // Envia apenas os dados válidos
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    const errorMessage = errorData.error || "Erro ao salvar Centro Esportivo"
                    throw new Error(errorMessage)
                }

                const result = await response.json()

                if (!isUpdating) {
                    _sportsCenter.push(result)
                } else {
                    _sportsCenter[_sportsCenter.findIndex((g) => g.id === sportsCenter.id)] = result
                }

                toast.current?.show({
                    severity: "success",
                    summary: "Sucesso",
                    detail: isUpdating ? "Centro Esportivo atualizado com sucesso" : "Centro Esportivo criado com sucesso",
                    life: 3000,
                })

                setSportsCenters(_sportsCenter)
                setSportsCenterDialog(false)

                setSportsCenter({
                    id: null,
                    name: "",
                    address: "",
                    neighborhood: "",
                    number: "",
                    city: "",
                    state: "",
                    country: "",
                    email: "",
                    phone: "",
                    hasWifi: false,
                    hasParking: false,
                    parkingCapacity: 0,
                    opensOnHolidays: false,
                    hasPlayground: false,
                })
            } catch (error) {
                console.error("Erro ao salvar Centro Esportivo:", error)
                const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao salvar Centro Esportivo"
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

    const editSportsCenter = (sportsCenter: SportsCenter) => {
        setSportsCenter({ ...sportsCenter })
        setLogo(`data:image/jpeg;base64,${sportsCenter.logo}`)
        setSportsCenterDialog(true)
    }

    const deleteSportsCenter = async (sportsCenter: SportsCenter) => {
        try {
            const response = await fetch(`/api/sports-center/delete/${sportsCenter.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            })

            if (response.ok) {
                let _sportsCenter = sportsCenters.filter((val) => val.id !== sportsCenter.id)
                setSportsCenters(_sportsCenter)
                toast.current?.show({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Centro Esportivo deletado com sucesso",
                    life: 3000,
                })
            } else {
                throw new Error("Erro ao deletar Centro Esportivo")
            }
        } catch (error) {
            console.error("Erro ao deletar Centro Esportivo:", error)
            toast.current?.show({
                severity: "error",
                summary: "Erro",
                detail: "Erro ao deletar Centro Esportivo",
                life: 3000,
            })
        }
    }

    const fetchAddress = async (cep: any) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data = await response.json()
            if (!data.erro) {
                setSportsCenter({
                    ...sportsCenter,
                    address: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf,
                })
            } else {
                alert("CEP não encontrado.")
            }
        } catch (error) {
            console.error("Erro ao buscar o endereço:", error)
        } finally {
        }
    }

    const handleCepChange = (e: { target: { value: any } }) => {
        const cep = e.target.value
        console.log(cep.length)
        setSportsCenter({ ...sportsCenter, cep })
        if (cep.length === 9) {
            fetchAddress(cep)
        }
    }

    const viewDetails = (sportsCenter: SportsCenter) => {
        setSelectedSportsCenter(sportsCenter)
        setDetailsSportCenterDialog(true)
    }

    const sportsCenterDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-danger" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-success" onClick={saveSportsCenter} />
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
                    value={sportsCenters}
                    selectionMode="single"
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Centros Esportivos"
                >
                    <Column
                        header="Imagem"
                        body={(rowData) => {
                            const imageSrc = rowData.logo ? `data:image/jpeg;base64,${rowData.logo}` : ""
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "80px",
                                        width: "80px",
                                        backgroundColor: rowData.logo ? "transparent" : "#f0f0f0",
                                        borderRadius: "4px",
                                        overflow: "hidden",
                                    }}
                                >
                                    {rowData.logo ? (
                                        <img src={imageSrc} alt={rowData.description} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                    ) : (
                                        <i className="pi pi-image" style={{ fontSize: "2em", color: "#888" }}></i>
                                    )}
                                </div>
                            )
                        }}
                    ></Column>
                    <Column field="name" header="Nome" sortable />
                    <Column field="city" header="Cidade" sortable />
                    <Column field="state" header="Estado" sortable />
                    <Column field="address" header="Endereço" sortable />
                    <Column field="phone" header="Telefone" sortable />
                    <Column field="email" header="Email" sortable />
                    <Column
                        field="createdAt"
                        header="Criado em"
                        sortable
                        body={(rowData: SportsCenter) => new Date(rowData.createdAt!).toLocaleDateString()}
                    />
                    <Column
                        field="updatedAt"
                        header="Atualizado em"
                        sortable
                        body={(rowData: SportsCenter) => new Date(rowData.updatedAt!).toLocaleDateString()}
                    />
                    <Column
                        header="Ações"
                        body={(rowData: SportsCenter) => (
                            <div className="flex gap-2">
                                <Button icon="pi pi-eye" className="p-button-rounded p-button-info" onClick={() => viewDetails(rowData)} />
                                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => editSportsCenter(rowData)} />
                                <DeleteButton
                                    item={rowData}
                                    onDelete={deleteSportsCenter}
                                    message={`Você tem certeza que deseja deletar o sportcenter ${rowData.name}?`}
                                    header="Confirmação"
                                />{" "}
                            </div>
                        )}
                    />
                </DataTable>
            </div>

            <Dialog
                visible={sportsCenterDialog}
                draggable={false}
                style={{ width: "80vw" }}
                header="Detalhes do Centro Esportivo"
                modal
                className="p-fluid"
                footer={sportsCenterDialogFooter}
                onHide={hideDialog}
            >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <label
                        htmlFor="image-upload"
                        style={{
                            cursor: "pointer",
                            borderRadius: "50%",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100px",
                            height: "100px",
                            backgroundColor: logo ? "transparent" : "#f0f0f0",
                        }}
                    >
                        {logo ? (
                            <img src={logo} alt="Produto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                            <i className="pi pi-image" style={{ fontSize: "2em", color: "#888" }}></i>
                        )}
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/png, image/jpeg"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                <div className="p-field" style={{ marginBottom: "20px" }}>
                    <label htmlFor="name">Nome</label>
                    <InputText
                        id="name"
                        value={sportsCenter.name}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, name: e.target.value })}
                        required
                        autoFocus
                    />
                </div>

                <div className="p-field" style={{ marginBottom: "20px" }}>
                    <label htmlFor="address">Endereço</label>
                    <InputText
                        id="address"
                        value={sportsCenter.address}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, address: e.target.value })}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="p-field" style={{ marginBottom: "20px" }}>
                    <label htmlFor="neighborhood">Bairro</label>
                    <InputText
                        id="neighborhood"
                        value={sportsCenter.neighborhood}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, neighborhood: e.target.value })}
                        disabled={isLoading}
                    />
                </div>
                <div className="p-field" style={{ marginBottom: "20px" }}>
                    <label htmlFor="city">Cidade</label>
                    <InputText
                        id="city"
                        value={sportsCenter.city}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, city: e.target.value })}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="p-field" style={{ marginBottom: "20px" }}>
                    <label htmlFor="state">Estado</label>
                    <InputText
                        id="state"
                        value={sportsCenter.state}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, state: e.target.value })}
                        disabled={isLoading}
                    />
                </div>
                <div className="p-field" style={{ marginBottom: "20px" }}>
                    <label htmlFor="country">País</label>
                    <InputText
                        id="country"
                        value={sportsCenter.country}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, country: e.target.value })}
                    />
                </div>
                <div className="p-field" style={{ marginBottom: "20px" }}>
                    <label htmlFor="number">Número</label>
                    <InputText
                        id="number"
                        value={sportsCenter.number}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, number: e.target.value })}
                    />
                </div>

                <div className="p-field" style={{ marginBottom: "20px" }}>
                    <label htmlFor="email">E-mail</label>
                    <InputText id="email" value={sportsCenter.email} onChange={(e) => setSportsCenter({ ...sportsCenter, email: e.target.value })} />
                </div>
                <div className="p-field" style={{ marginBottom: "20px" }}>
                    <label htmlFor="phone">Telefone</label>
                    <InputText id="phone" value={sportsCenter.phone} onChange={(e) => setSportsCenter({ ...sportsCenter, phone: e.target.value })} />
                </div>
                <div className="p-field-checkbox" style={{ marginBottom: "20px" }}>
                    <input
                        type="checkbox"
                        id="hasWifi"
                        checked={sportsCenter.hasWifi}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, hasWifi: e.target.checked })}
                    />
                    <label htmlFor="hasWifi">Possui Wi-Fi?</label>
                </div>
                <div className="p-field-checkbox" style={{ marginBottom: "20px" }}>
                    <input
                        type="checkbox"
                        id="hasParking"
                        checked={sportsCenter.hasParking}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, hasParking: e.target.checked })}
                    />
                    <label htmlFor="hasParking">Possui Estacionamento?</label>
                </div>
                <div className="p-field" style={{ marginBottom: "20px" }}>
                    <label htmlFor="parkingCapacity">Capacidade do Estacionamento</label>
                    <InputText
                        id="parkingCapacity"
                        value={sportsCenter.parkingCapacity.toString()}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, parkingCapacity: +e.target.value })}
                    />
                </div>
                <div className="p-field-checkbox" style={{ marginBottom: "20px" }}>
                    <input
                        type="checkbox"
                        id="opensOnHolidays"
                        checked={sportsCenter.opensOnHolidays}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, opensOnHolidays: e.target.checked })}
                    />
                    <label htmlFor="opensOnHolidays">Abre nos feriados?</label>
                </div>
                <div className="p-field-checkbox" style={{ marginBottom: "20px" }}>
                    <input
                        type="checkbox"
                        id="hasPlayground"
                        checked={sportsCenter.hasPlayground}
                        onChange={(e) => setSportsCenter({ ...sportsCenter, hasPlayground: e.target.checked })}
                    />
                    <label htmlFor="hasPlayground">Possui Playground?</label>
                </div>
            </Dialog>

            <ConfirmDialog />

            <Dialog visible={DetailsSportCenterDialog} header="Detalhes do Centro Esportivo" modal onHide={hideDialog} className="dialog-box">
                {selectedSportsCenter && (
                    <div className="p-fluid grid">
                        {/* Imagem */}
                        <div className="p-col-12 p-md-6">
                            {selectedSportsCenter.logo ? (
                                <img
                                    src={`data:image/jpeg;base64,${selectedSportsCenter.logo}`}
                                    alt="Logo do Centro Esportivo"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        maxHeight: "250px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "250px",
                                        backgroundColor: "#f0f0f0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <i className="pi pi-image" style={{ fontSize: "3em", color: "#888" }}></i>
                                </div>
                            )}
                        </div>

                        {/* Informações detalhadas */}
                        <div className="p-col-12 p-md-6">
                            <div className="p-field">
                                <h3>{selectedSportsCenter.name}</h3>
                            </div>
                            <div className="p-field">
                                <p>
                                    <strong>Endereço: </strong>
                                    {`${selectedSportsCenter.address}, ${selectedSportsCenter.neighborhood}, Nº ${selectedSportsCenter.number}, ${selectedSportsCenter.city}, ${selectedSportsCenter.state}`}
                                </p>
                            </div>
                            <div className="p-field">
                                <p>
                                    <strong>Email: </strong>
                                    {selectedSportsCenter.email}
                                </p>
                            </div>
                            <div className="p-field">
                                <p>
                                    <strong>Telefone: </strong>
                                    {selectedSportsCenter.phone}
                                </p>
                            </div>
                            <div className="p-field">
                                <p>
                                    <strong>Wi-Fi: </strong>
                                    {selectedSportsCenter.hasWifi ? "Sim" : "Não"}
                                </p>
                            </div>
                            <div className="p-field">
                                <p>
                                    <strong>Estacionamento: </strong>
                                    {selectedSportsCenter.hasParking ? `Sim (Capacidade: ${selectedSportsCenter.parkingCapacity})` : "Não"}
                                </p>
                            </div>
                            <div className="p-field">
                                <p>
                                    <strong>Playground: </strong>
                                    {selectedSportsCenter.hasPlayground
                                        ? `Sim (Observações: ${selectedSportsCenter.playgroundObs || "Nenhuma"})`
                                        : "Não"}
                                </p>
                            </div>
                            <div className="p-field">
                                <p>
                                    <strong>Abre em Feriados: </strong>
                                    {selectedSportsCenter.opensOnHolidays ? "Sim" : "Não"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>
        </>
    )
}
