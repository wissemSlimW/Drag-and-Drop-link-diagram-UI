import * as icons from '../Icons'

export const COLORS = [
    { id: "color1", value: "red" },
    { id: "color2", value: "green" },
    { id: "color3", value: "blue" },
    { id: "color4", value: "orange" },
    { id: "color5", value: "yellow" },
    { id: "color6", value: "purple" },
    { id: "color7", value: "grey" },
]

export const ICONS = Object.keys(icons).map(k => ({ id: k, value: k }))

export const SHAPES: { id: Shapes, value: string }[] = [
    { id: 'circle', value: 'Circle' },
    { id: 'square', value: 'Square' },
] 