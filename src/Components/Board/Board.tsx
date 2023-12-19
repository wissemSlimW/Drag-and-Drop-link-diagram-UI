import { IconButton } from "@mui/material";
import { useMemo, useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import { AddDialog, DraggablePage } from "..";
import { AddCircle } from "../../Icons";
import "./styles.css";
import { useGetAllApi } from "../../Api/useGetAllApi";
import { useAddApi } from "../../Api/useAddApi";
import { useApi } from "../../Api/useApi";
import { useRemoveApi } from "../../Api/useRemoveApi";



export const Board = () => {
    const [arrows, setArrows] = useState<Arrow[]>([])
    const [readyArrows, setReadyArrows] = useState<boolean>(true)
    const [pages, setPages] = useState<Page[]>([])
    const [readyPages, setReadyPages] = useState<boolean>(true)
    useApi({
        endpoint: 'arrows',
        handleError: (err) => console.log(err),
        setData: setArrows,
        setReady: setReadyArrows
    })
    useApi({
        endpoint: 'pages',
        handleError: (err) => console.log(err),
        setData: setPages,
        setReady: setReadyPages
    })

    const [showDialog, setShowDialog] = useState(false)
    const [config, setConfig] = useState<Confguration[]>([])
    const addArrow = ({ start, end }: { start: string, end: string }) => {
        useAddApi({ endpoint: 'arrows', body: { start: +start, end: +end }, handleResponse: (res) => setArrows([...arrows, res]) })
    };
    const configPages = useMemo(() => config.map(p => {
        const page = pages.find(t => t.id === p.pageId)!
        return ({
            ...p,
            ...page
        })
    }), [pages, config])

    const handleDropPage = (x: number, y: number, page: Page) => {
        if (x > 80) {
            if (config.find(p => p.pageId === page.id)) {
                const _config = [...config]
                _config[_config.findIndex(p => p.pageId === page.id)] = { pageId: page.id!, x, y }
                setConfig(_config)

            }
            else {
                // useAddApi({
                //     endpoint: 'configurations',
                //     body: { pageId: +page.id!, x, y },
                //     handleResponse: () => setConfig([...config, { pageId: page.id!, x, y }])
                // })
                setConfig([...config, { pageId: page.id!, x, y }])
            }
        }
        else {
            // useRemoveApi({
            //     endpoint: 'configurations',
            //     id: +page.id!,
            //     handleResponse: () => setConfig(config.filter(p => p.pageId !== page.id))
            // })
            setConfig(config.filter(p => p.pageId !== page.id))
        }
    }

    return (
        <Xwrapper >
            <div className="sideBar" >
                <h1>Tools</h1>
                <div className="pagesContainer">
                    {pages.filter(t => config.every(p => p.pageId !== t.id)).map((page) => <DraggablePage
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
                {arrows.filter(a => pages.filter(t => config.every(p => p.pageId !== t.id)).every(p => p.id !== a.end && a.start !== p.id)).map((ar) => (
                    <Xarrow
                        path="grid"
                        start={ar.start.toString()}
                        end={ar.end.toString()}
                        key={ar.id}
                    />
                ))}
            </div>
            <AddDialog {...{ setShowDialog, showDialog, setPages }} />
        </Xwrapper>
    );
}
