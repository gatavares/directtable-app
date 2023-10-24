import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { icons } from "react-icons";
import { create } from "@mui/material/styles/createTransitions";

//500 sempre cor inserida

export const tokens = (mode) => ({
    ...(mode === 'dark' ? {
        //cores universais
        projectColor: {
            100: "#ccdde9",
            200: "#99bcd3",
            300: "#669abe",
            400: "#3379a8",
            500: "#005792", //x
            600: "#004675",
            700: "#003458",
            800: "#00233a",
            900: "#00111d"
        },
        iconsSelect: {
            100: "#ffdade",
            200: "#feb6be",
            300: "#fe919d",
            400: "#fd6d7d",
            500: "#fd485c", //x
            600: "#ca3a4a",
            700: "#982b37",
            800: "#651d25",
            900: "#330e12"
        },
        iconVerde: {
            100: "#d1eadd",
            200: "#a3d5bb",
            300: "#74c198",
            400: "#46ac76",
            500: "#189754", //x
            600: "#137943",
            700: "#0e5b32",
            800: "#0a3c22",
            900: "#051e11"
        },
        iconVermelho: {
            100: "#f8d7da",
            200: "#f1aeb5",
            300: "#ea868f",
            400: "#e35d6a",
            500: "#dc3545", //x
            600: "#b02a37",
            700: "#842029",
            800: "#58151c",
            900: "#2c0b0e"
        },
        gpsi: {
            100: "#eff6d9",
            200: "#e0edb4",
            300: "#d0e48e",
            400: "#c1db69", //x
            500: "#b1d243",
            600: "#8ea836",
            700: "#6a7e28",
            800: "#47541b",
            900: "#232a0d"
        },
        tm: {
            100: "#d7dbec",
            200: "#afb8d8",
            300: "#8894c5",
            400: "#6071b1", //x
            500: "#384d9e",
            600: "#2d3e7e",
            700: "#222e5f",
            800: "#161f3f",
            900: "#0b0f20"
        },
        teac: {
            100: "#daecf8",
            200: "#b6d8f1",
            300: "#91c5e9",
            400: "#6db1e2", //x
            500: "#489edb",
            600: "#3a7eaf",
            700: "#2b5f83",
            800: "#1d3f58",
            900: "#0e202c"
        },
        gei: {
            100: "#fef7db",
            200: "#fdf0b7",
            300: "#fbe892",
            400: "#fae16e", //x
            500: "#f9d94a",
            600: "#c7ae3b",
            700: "#95822c",
            800: "#64571e",
            900: "#322b0f"
        },
        td3d: {
            100: "#fbded6",
            200: "#f7bdad",
            300: "#f49c85",
            400: "#f07b5c", //x
            500: "#ec5a33",
            600: "#bd4829",
            700: "#8e361f",
            800: "#5e2414",
            900: "#2f120a"
        },
        cef: {
            100: "#fbd6e7",
            200: "#f7aed0",
            300: "#f285b8",
            400: "#ee5da1", //x
            500: "#ea3489",
            600: "#bb2a6e",
            700: "#8c1f52",
            800: "#5e1537",
            900: "#2f0a1b"
        },



        //cores do tema
        fundo: {
            100: "#d1d1d1",
            200: "#a3a3a3",
            300: "#757575",
            400: "#474747",
            500: "#191919", //x
            600: "#141414",
            700: "#0f0f0f",
            800: "#0a0a0a",
            900: "#050505"
        },
        nav: {
            100: "#d1d1d1",
            200: "#a3a3a3",
            300: "#757575",
            400: "#474747",
            500: "#191919", //x
            600: "#141414",
            700: "#0f0f0f",
            800: "#0a0a0a",
            900: "#050505"
        },
        icons: {
            100: "#ffffff",
            200: "#ffffff",
            300: "#ffffff",
            400: "#ffffff",
            500: "#ffffff", //x
            600: "#cccccc",
            700: "#999999",
            800: "#666666",
            900: "#333333"
        },
        texto: {
            100: "#ffffff",
            200: "#ffffff",
            300: "#ffffff",
            400: "#ffffff",
            500: "#ffffff", //x
            600: "#cccccc",
            700: "#999999",
            800: "#666666",
            900: "#333333"
        },
        primario: {
            100: "#d6d6d6",
            200: "#aeaeae",
            300: "#858585",
            400: "#5d5d5d",
            500: "#343434", //x
            600: "#2a2a2a",
            700: "#1f1f1f",
            800: "#151515",
            900: "#0a0a0a"
        },
        secundario: {
            100: "#e1e1e1",
            200: "#c2c2c2",
            300: "#a4a4a4",
            400: "#858585",
            500: "#676767", //x
            600: "#525252",
            700: "#3e3e3e",
            800: "#292929",
            900: "#151515"
        },
        disciplina: {
            100: "#dbe7ff",
            200: "#b6ceff",
            300: "#92b6ff",
            400: "#6d9dff",
            500: "#4985ff", //x
            600: "#3a6acc",
            700: "#2c5099",
            800: "#1d3566",
            900: "#0f1b33"
        },
        disciplinaTexto: {
            100: "#dbe7ff",
            200: "#b6ceff",
            300: "#92b6ff",
            400: "#6d9dff",
            500: "#4985ff", //x
            600: "#3a6acc",
            700: "#2c5099",
            800: "#1d3566",
            900: "#0f1b33"
        },
        sala: {
            100: "#ffead0",
            200: "#ffd5a1",
            300: "#ffbf72",
            400: "#ffaa43",
            500: "#ff9514", //x
            600: "#cc7710",
            700: "#99590c",
            800: "#663c08",
            900: "#331e04"
        },
        salaTexto: {
            100: "#ffead0",
            200: "#ffd5a1",
            300: "#ffbf72",
            400: "#ffaa43",
            500: "#ff9514", //x
            600: "#cc7710",
            700: "#99590c",
            800: "#663c08",
            900: "#331e04"
        },
        canceladoTexto: {
            100: "#f8d7da",
            200: "#f1aeb5",
            300: "#ea868f",
            400: "#e35d6a",
            500: "#dc3545", //x
            600: "#b02a37",
            700: "#842029",
            800: "#58151c",
            900: "#2c0b0e"
        },
        cancelado: {
            100: "#f8d7da",
            200: "#f1aeb5",
            300: "#ea868f",
            400: "#e35d6a",
            500: "#dc3545", //x
            600: "#b02a37",
            700: "#842029",
            800: "#58151c",
            900: "#2c0b0e"
        },
        disciplinaHorario: {
            100: "#f4f8ff",
            200: "#eaf1ff",
            300: "#dfe9fe",
            400: "#d5e2fe",
            500: "#cadbfe", //x
            600: "#a2afcb",
            700: "#798398",
            800: "#515866",
            900: "#282c33"
        },
        salaHorario: {
            100: "#fff7ee",
            200: "#ffefdd",
            300: "#ffe8cb",
            400: "#ffe0ba",
            500: "#ffd8a9", //x
            600: "#ccad87",
            700: "#998265",
            800: "#665644",
            900: "#332b22"
        },
        canceladoHorario: {
            100: "#f8dede",
            200: "#f1bebe",
            300: "#eb9d9d",
            400: "#e47d7d",
            500: "#dd5c5c", //x
            600: "#b14a4a",
            700: "#853737",
            800: "#582525",
            900: "#2c1212"
        },
    } : {




        //cores universais
        projectColor: {
            100: "#ccdde9",
            200: "#99bcd3",
            300: "#669abe",
            400: "#3379a8",
            500: "#005792", //x
            600: "#004675",
            700: "#003458",
            800: "#00233a",
            900: "#00111d"
        },
        iconsSelect: {
            100: "#ffdade",
            200: "#feb6be",
            300: "#fe919d",
            400: "#fd6d7d",
            500: "#fd485c", //x
            600: "#ca3a4a",
            700: "#982b37",
            800: "#651d25",
            900: "#330e12"
        },
        iconVerde: {
            100: "#d1eadd",
            200: "#a3d5bb",
            300: "#74c198",
            400: "#46ac76",
            500: "#189754", //x
            600: "#137943",
            700: "#0e5b32",
            800: "#0a3c22",
            900: "#051e11"
        },
        iconVermelho: {
            100: "#f8d7da",
            200: "#f1aeb5",
            300: "#ea868f",
            400: "#e35d6a",
            500: "#dc3545", //x
            600: "#b02a37",
            700: "#842029",
            800: "#58151c",
            900: "#2c0b0e"
        },
        gpsi: {
            100: "#eff6d9",
            200: "#e0edb4",
            300: "#d0e48e",
            400: "#c1db69", //x
            500: "#b1d243",
            600: "#8ea836",
            700: "#6a7e28",
            800: "#47541b",
            900: "#232a0d"
        },
        tm: {
            100: "#d7dbec",
            200: "#afb8d8",
            300: "#8894c5",
            400: "#6071b1", //x
            500: "#384d9e",
            600: "#2d3e7e",
            700: "#222e5f",
            800: "#161f3f",
            900: "#0b0f20"
        },
        teac: {
            100: "#daecf8",
            200: "#b6d8f1",
            300: "#91c5e9",
            400: "#6db1e2", //x
            500: "#489edb",
            600: "#3a7eaf",
            700: "#2b5f83",
            800: "#1d3f58",
            900: "#0e202c"
        },
        gei: {
            100: "#fef7db",
            200: "#fdf0b7",
            300: "#fbe892",
            400: "#fae16e", //x
            500: "#f9d94a",
            600: "#c7ae3b",
            700: "#95822c",
            800: "#64571e",
            900: "#322b0f"
        },
        td3d: {
            100: "#fbded6",
            200: "#f7bdad",
            300: "#f49c85",
            400: "#f07b5c", //x
            500: "#ec5a33",
            600: "#bd4829",
            700: "#8e361f",
            800: "#5e2414",
            900: "#2f120a"
        },
        cef: {
            100: "#fbd6e7",
            200: "#f7aed0",
            300: "#f285b8",
            400: "#ee5da1", //x
            500: "#ea3489",
            600: "#bb2a6e",
            700: "#8c1f52",
            800: "#5e1537",
            900: "#2f0a1b"
        },


        //cores do tema
        fundo: {
            100: "#fbfcfd",
            200: "#f7f9fb",
            300: "#f3f6fa",
            400: "#eff3f8",
            500: "#ebf0f6", //x
            600: "#bcc0c5",
            700: "#8d9094",
            800: "#5e6062",
            900: "#2f3031"
        },
        nav: {
            100: "#ffffff",
            200: "#ffffff",
            300: "#ffffff",
            400: "#ffffff",
            500: "#ffffff", //x
            600: "#cccccc",
            700: "#999999",
            800: "#666666",
            900: "#333333"
        },
        icons: {
            100: "#dddddd",
            200: "#bbbaba",
            300: "#989898",
            400: "#767575",
            500: "#545353", //x
            600: "#434242",
            700: "#323232",
            800: "#222121",
            900: "#111111"
        },
        texto: {
            100: "#d6d6d6",
            200: "#adadad",
            300: "#838383",
            400: "#5a5a5a",
            500: "#313131", //x
            600: "#272727",
            700: "#1d1d1d",
            800: "#141414",
            900: "#0a0a0a"
        },
        primario: {
            100: "#d6d6d6",
            200: "#adadad",
            300: "#838383",
            400: "#5a5a5a",
            500: "#313131", //x
            600: "#272727",
            700: "#1d1d1d",
            800: "#141414",
            900: "#0a0a0a"
        },
        secundario: {
            100: "#e1e1e1",
            200: "#c2c2c2",
            300: "#a4a4a4",
            400: "#858585",
            500: "#676767", //x
            600: "#525252",
            700: "#3e3e3e",
            800: "#292929",
            900: "#151515"
        },

        disciplina: {
            100: "#f4f8ff",
            200: "#eaf1ff",
            300: "#dfe9fe",
            400: "#d5e2fe",
            500: "#cadbfe", //x
            600: "#a2afcb",
            700: "#798398",
            800: "#515866",
            900: "#282c33"
        },
        disciplinaHorario: {
            100: "#f4f8ff",
            200: "#eaf1ff",
            300: "#dfe9fe",
            400: "#d5e2fe",
            500: "#cadbfe", //x
            600: "#a2afcb",
            700: "#798398",
            800: "#515866",
            900: "#282c33"
        },
        disciplinaTexto: {
            100: "#dbe7ff",
            200: "#b6ceff",
            300: "#92b6ff",
            400: "#6d9dff",
            500: "#4985ff", //x
            600: "#3a6acc",
            700: "#2c5099",
            800: "#1d3566",
            900: "#0f1b33"
        },
        sala: {
            100: "#fff7ee",
            200: "#ffefdd",
            300: "#ffe8cb",
            400: "#ffe0ba",
            500: "#ffd8a9", //x
            600: "#ccad87",
            700: "#998265",
            800: "#665644",
            900: "#332b22"
        },
        salaTexto: {
            100: "#ffead0",
            200: "#ffd5a1",
            300: "#ffbf72",
            400: "#ffaa43",
            500: "#ff9514", //x
            600: "#cc7710",
            700: "#99590c",
            800: "#663c08",
            900: "#331e04"
        },
        salaHorario: {
            100: "#fff7ee",
            200: "#ffefdd",
            300: "#ffe8cb",
            400: "#ffe0ba",
            500: "#ffd8a9", //x
            600: "#ccad87",
            700: "#998265",
            800: "#665644",
            900: "#332b22"
        },
        canceladoTexto: {
            100: "#f8d7da",
            200: "#f1aeb5",
            300: "#ea868f",
            400: "#e35d6a",
            500: "#dc3545", //x
            600: "#b02a37",
            700: "#842029",
            800: "#58151c",
            900: "#2c0b0e"
        },
        cancelado: {
            100: "#f8dede",
            200: "#f1bebe",
            300: "#eb9d9d",
            400: "#e47d7d",
            500: "#dd5c5c", //x
            600: "#b14a4a",
            700: "#853737",
            800: "#582525",
            900: "#2c1212"
        },
        canceladoHorario: {
            100: "#f8dede",
            200: "#f1bebe",
            300: "#eb9d9d",
            400: "#e47d7d",
            500: "#dd5c5c", //x
            600: "#b14a4a",
            700: "#853737",
            800: "#582525",
            900: "#2c1212"
        },
    })
})




export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark' ? {
                //cores universais
                background: {
                    default: colors.fundo[500],
                },
                projectColor: {
                    main: colors.projectColor[500]
                },
                iconsSelect: {
                    main: colors.iconsSelect[500]
                },
                iconVerde: {
                    main: colors.iconVerde[500]
                },
                iconVermelho: {
                    main: colors.iconVermelho[500]
                },
                gpsi: {
                    main: colors.gpsi[400]
                },
                tm: {
                    main: colors.tm[400]
                },
                gei: {
                    main: colors.gei[400]
                },
                teac: {
                    main: colors.teac[400]
                },
                td3d: {
                    main: colors.td3d[400]
                },
                cef: {
                    main: colors.cef[400]
                },

                //cores do tema
                fundo: {
                    default: colors.fundo[500]
                },
                nav: {
                    main: colors.nav[500]
                },
                icons: {
                    main: colors.icons[500]
                },
                texto: {
                    main: colors.texto[500]
                },
                primario: {
                    main: colors.primario[500]
                },
                secundario: {
                    main: colors.secundario[500]
                },
                disciplina: {
                    main: colors.disciplina[500]
                },
                sala: {
                    main: colors.sala[500]
                },
                cancelado: {
                    main: colors.cancelado[500]
                },
            } : {
                //cores universais
                background: {
                    default: colors.fundo[500],
                },
                projectColor: {
                    main: colors.projectColor[500]
                },
                iconsSelect: {
                    main: colors.iconsSelect[500]
                },
                iconVerde: {
                    main: colors.iconVerde[500]
                },
                iconVermelho: {
                    main: colors.iconVermelho[500]
                },
                gpsi: {
                    main: colors.gpsi[400]
                },
                tm: {
                    main: colors.tm[400]
                },
                gei: {
                    main: colors.gei[400]
                },
                teac: {
                    main: colors.teac[400]
                },
                td3d: {
                    main: colors.td3d[400]
                },
                cef: {
                    main: colors.cef[400]
                },

                //cores do tema
                fundo: {
                    default: colors.fundo[500]
                },
                nav: {
                    main: colors.nav[500]
                },
                icons: {
                    main: colors.icons[500]
                },
                texto: {
                    main: colors.texto[500]
                },
                primario: {
                    main: colors.primario[500]
                },
                secundario: {
                    main: colors.secundario[500]
                },
                disciplina: {
                    main: colors.disciplina[500]
                },
                sala: {
                    main: colors.sala[500]
                },
                cancelado: {
                    main: colors.cancelado[500]
                },
            })
        }
    }
}


export const ColorModeContext = createContext({
    toggleColorMode: () => { }
})

export const useMode = () => {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
}