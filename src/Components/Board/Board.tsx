import { IconButton } from "@mui/material";
import { useMemo, useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import { AddDialog, DraggablePage } from "..";
import { AddCircle } from "../../Icons";
import "./styles.css";
import { useGetAllApi } from "../../Api/useGetAllApi";
import { useAddApi } from "../../Api/useAddApi";



export const Board = () => {

    const { data: tools } = useGetAllApi<Page>({ endpoint: '' })
    const { data: arrows } = useGetAllApi<Arrow>({ endpoint: '' })
    const [showDialog, setShowDialog] = useState(false)
    const [pages, setPages] = useState<Confguration[]>([])
    const addArrow = ({ start, end }: { start: string, end: string }) => {
        useAddApi({ endpoint: 'arrows', body: { start, end } })
    };
    const configPages = useMemo(() => pages.map(p => {
        const page = tools.find(t => t.id === p.pageId)!
        return ({
            ...p,
            ...page
        })
    }), [tools, pages])

    const handleDropPage = (x: number, y: number, page: Page) => {
        if (x > 80) {
            if (pages.find(p => p.pageId === page.id)) {
                const _pages = [...pages]
                _pages[_pages.findIndex(p => p.pageId === page.id)] = { pageId: page.id!, position: { x, y } }
            }
            else
                setPages([...pages, { pageId: page.id!, position: { x, y } }])
        }
        else {
            setPages(pages.filter(p => p.pageId !== page.id))
        }
    }

    return (
        <Xwrapper >
            <div className="sideBar" >
                <h1>Tools</h1>
                <div className="pagesContainer">
                    {tools.filter(t => pages.every(p => p.pageId !== t.id)).map((page) => <DraggablePage
                        handleDrop={(x, y) => handleDropPage(x, y, page)}
                        {...{ key: page.id, addArrow, page, }}
                    />)}
                </div>
                <span>
                    <IconButton onClick={() => setShowDialog(true)}>
                        <AddCircle />
                    </IconButton>
                </span>
            </div>
            <div
                style={{ position: 'relative', flex: 1 }}>
                {configPages.map((page) => <DraggablePage
                    showConnectors={true}
                    handleDrop={(x, y) => handleDropPage(x, y, page)}
                    {...{ key: page.id, addArrow, page, }}
                />)}
                {arrows.map((ar) => (
                    <Xarrow
                        path="grid"
                        start={ar.start.toString()}
                        end={ar.end.toString()}
                        key={ar.id}
                    />
                ))}
            </div>
            <AddDialog {...{ setShowDialog, showDialog }} />
        </Xwrapper>
    );
}
