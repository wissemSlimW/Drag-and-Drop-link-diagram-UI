import { Button, Dialog, DialogContent, DialogTitle, Grid, MenuItem, Select, TextField } from "@mui/material"
import { FormEvent, useState } from "react"
import { COLORS, ICONS, SHAPES } from "../../constants/constants"
import { useAddApi } from "../../Api/useAddApi"

export const AddDialog = ({ showDialog, setShowDialog }: { showDialog: boolean, setShowDialog: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [data, setData] = useState<Page>({
        color: null! as string,
        icon: null! as Page['icon'],
        title: '',
        shape: null! as Shapes
    })
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        useAddApi({ endpoint: 'pages', body: data })

    }

    return (<Dialog open={showDialog}
        onClose={() => setShowDialog(false)}>
        <DialogTitle>
            <div>Add new page</div>
        </DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Grid>Title</Grid>
                    <Grid>
                        <TextField
                            required
                            onChange={(e) => setData({ ...data || [], title: e.target.value })}
                            value={data?.title || ''} />
                    </Grid>
                </Grid>
                <Grid>
                    <Grid>Color</Grid>
                    <Select
                        required
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={data?.color}
                        style={{ backgroundColor: COLORS.find(c => c.id === data.color)?.value }}
                        label=""
                        onChange={(e) => setData({ ...data || [], color: e.target.value })}
                    >
                        {COLORS.map((color, key) => <MenuItem key={key} value={color.id} style={{ height: 30, backgroundColor: color.value }}></MenuItem>)}

                    </Select>
                </Grid>
                <Grid>
                    <Grid>Icon</Grid>
                    <Grid>
                        <Select
                            required
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data?.icon}
                            label=""
                            onChange={(e) => setData({ ...data || [], icon: e.target.value as Page['icon'] })}
                        >
                            {ICONS.map((icon, key) => <MenuItem key={key} value={icon.id} style={{ height: 30, }}>{icon.value}</MenuItem>)}

                        </Select>
                    </Grid>
                </Grid>
                <Grid>
                    <Grid>Form</Grid>
                    <Grid>
                        <Select
                            required
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data?.shape}
                            label=""
                            onChange={(e) => setData({ ...data || [], shape: e.target.value as Shapes })}
                        >
                            {SHAPES.map((shape, key) => <MenuItem key={key} value={shape.id} style={{ height: 30, }}>{shape.value}</MenuItem>)}

                        </Select>
                    </Grid>
                </Grid>
                <Grid container style={{ justifyContent: 'center', paddingBlock: 20 }}>
                    <Button variant="contained" type='submit'>Save</Button>
                </Grid>
            </form>
        </DialogContent>
    </Dialog>)
}