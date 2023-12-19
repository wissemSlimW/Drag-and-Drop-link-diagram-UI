import { Fragment, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import Xarrow, { useXarrow } from 'react-xarrows';
import "./styles.css";
import { Icon } from '../Icon/Icon';
import { COLORS } from '../../constants/constants';


const shapesStyle: Record<Shapes, string> = { circle: "circleShape", hexagon: "hexagonShape", square: "squareShape" }

const connectPointStyle: React.CSSProperties = {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: "50%",
    background: "black"
};
const connectPointOffset: Record<"left" | "right" | "top" | "bottom", React.CSSProperties> = {
    left: { left: "0px", top: "50%", transform: "translate(-100%, -50%)" },
    right: { left: "100%", top: "50%", transform: "translate(0%, -50%)" },
    top: { left: "50%", top: "0px", transform: "translate(-50%, -100%)" },
    bottom: { left: "50%", top: "100%", transform: "translate(-50%, 0%)" }
};

const ConnectPointsWrapper = ({ id, handler, startRef }: { id: string, startRef: any, handler: "left" | "right" | "top" | "bottom" }) => {
    const endRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({});
    const [beingDragged, setBeingDragged] = useState(false);
    return (
        <Fragment>
            <div
                className="connectPoint"
                style={{
                    ...connectPointStyle,
                    ...connectPointOffset[handler],
                    ...position
                }}
                draggable
                onDragStart={e => {
                    setBeingDragged(true);
                    e.dataTransfer.setData("arrow", id);
                }}
                onDrag={e => {
                    setPosition({
                        position: "fixed",
                        left: e.clientX,
                        top: e.clientY,
                        transform: "none",
                        opacity: 0
                    });
                }}
                ref={endRef}
                onDragEnd={e => {
                    console.log('eeee')
                    setPosition({});
                    setBeingDragged(false);
                }}
            />
            {beingDragged ? <Xarrow path='grid' start={startRef} end={endRef} /> : null}
        </Fragment>
    );
};

export const DraggablePage = ({ showConnectors, page, addArrow, handleDrop }: {
    addArrow: ({ end, start }: { start: string, end: string }) => void,
    page: Page & Partial<Confguration>,
    showConnectors?: boolean,
    handleDrop?: (x: number, y: number) => void
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const updateXarrow = useXarrow();
    const handleDrag = (e: any) => {
        updateXarrow()
    }
    const handleStop = (e: any) => {
        e.preventDefault()
        handleDrop?.(e.clientX, e.clientY)
        updateXarrow()
    }
    return (
        <Draggable defaultClassNameDragging='' defaultPosition={{ x: page.x!, y: page.y! }} onDrag={handleDrag} onStop={handleStop}>
            <div
                id={page.id!.toString()}
                style={{ backgroundColor: COLORS.find(c => c.id === page.color)?.value }}
                className={`iconContainer ${shapesStyle[page.shape]}`}
                ref={ref}
                onDragOver={e => {
                    e.preventDefault()
                }}
                onDrop={e => {
                    if (e.dataTransfer.getData("arrow") === page.id!.toString()) {
                        console.log(e.dataTransfer.getData("arrow"), page.id);
                    } else {
                        const refs = { start: e.dataTransfer.getData("arrow"), end: page.id!.toString() };
                        addArrow(refs);
                    }
                }}
            >
                <Icon name={page.icon as any} />
                {!!showConnectors &&
                    <>
                        <ConnectPointsWrapper {...{ id: page.id!.toString(), handler: 'left', startRef: ref }} />
                        <ConnectPointsWrapper {...{ id: page.id!.toString(), handler: 'right', startRef: ref }} />
                        <ConnectPointsWrapper {...{ id: page.id!.toString(), handler: 'top', startRef: ref }} />
                        <ConnectPointsWrapper {...{ id: page.id!.toString(), handler: 'bottom', startRef: ref }} />
                        <label style={{ position: 'absolute', top: '130%' }}>{page.title}</label>
                    </>
                }

            </div>
        </Draggable >);
};