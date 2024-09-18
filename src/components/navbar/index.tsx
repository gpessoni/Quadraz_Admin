import React, { useRef, useState } from "react"
import * as S from "./styled"
import { faBars, faCog, faUsers, faFutbol, faCalendarAlt, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AdminNavbar = () => {
    const [showOptions, setShowOptions] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const timerRef = useRef<any | undefined>(undefined)

    const handleMouseEnter = () => {
        clearTimeout(timerRef.current)
        setShowOptions(true)
    }

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => {
            setShowOptions(false)
        }, 1000)
    }

    const checkWindowSize = () => {
        setIsMobile(window.innerWidth < 1024)
    }

    return (
        <S.Navbar>
            <S.Logo>
                <img src="https://www.quadraz.online/quadraz.svg" alt="Logo" />
            </S.Logo>
            {isMobile ? (
                <S.MenuIcon
                    onClick={() => {
                        setShowOptions(!showOptions)
                    }}
                >
                    <FontAwesomeIcon icon={faBars} />
                </S.MenuIcon>
            ) : (
                <S.NavLinks>
                    <S.NavLink href="/admin/dashboard">
                        <FontAwesomeIcon icon={faHome} /> Dashboard
                    </S.NavLink>
                    <S.NavLink href="/admin/courts">
                        <FontAwesomeIcon icon={faFutbol} /> Quadras
                    </S.NavLink>
                    <S.NavLink href="/admin/bookings">
                        <FontAwesomeIcon icon={faCalendarAlt} /> Reservas
                    </S.NavLink>
                    <S.NavLink href="/admin/clients">
                        <FontAwesomeIcon icon={faUsers} /> Clientes
                    </S.NavLink>
                    <S.NavLink href="/admin/settings">
                        <FontAwesomeIcon icon={faCog} /> Configurações
                    </S.NavLink>
                </S.NavLinks>
            )}

            {!isMobile && (
                <S.OptionsContainer onMouseLeave={handleMouseLeave}>
                    <S.CogIcon onMouseEnter={handleMouseEnter}>
                        <FontAwesomeIcon icon={faCog} />
                    </S.CogIcon>
                    <S.OptionsMenu showOptions={showOptions}>
                        <S.OptionItem href="/admin/profile">Perfil</S.OptionItem>
                        <S.OptionItem href="/admin/settings">Configurações</S.OptionItem>
                        <S.OptionItem href="/admin/logout">
                            <FontAwesomeIcon icon={faSignOutAlt} /> Sair
                        </S.OptionItem>
                    </S.OptionsMenu>
                </S.OptionsContainer>
            )}
        </S.Navbar>
    )
}

export default AdminNavbar
