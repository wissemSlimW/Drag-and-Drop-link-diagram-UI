
type IconName=keyof typeof import("../Icons")

interface Page {
    id?:number
    title: string,
    icon: IconName,
    color: string,
    shape: Shapes
}