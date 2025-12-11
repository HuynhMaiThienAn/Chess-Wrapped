type DroppableProps = {
    children: (props: {
        isOver: boolean;
    }) => React.ReactNode;
    squareId: string;
};
export declare function Droppable({ children, squareId }: DroppableProps): import("react/jsx-runtime").JSX.Element;
export {};
