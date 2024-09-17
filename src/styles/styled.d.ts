import "styled-components"
import { themeDark } from "./themeColors"

declare module "styled-components" {
    export interface DefaultTheme {
        color: {
            primary: string
            secondary: string
        }

        background: {
            primary: string
            secondary: string
        }
    }
}