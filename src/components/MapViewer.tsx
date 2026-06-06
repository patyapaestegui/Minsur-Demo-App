import {
  TransformWrapper,
  TransformComponent
} from "react-zoom-pan-pinch";

interface Props {
  children: React.ReactNode;
}

export default function MapViewer({
  children
}: Props) {

  return (

    <TransformWrapper

      initialScale={1}

      minScale={0.5}

      maxScale={8}

      wheel={{
        step: 0.2
      }}

    >

      <TransformComponent>

        {children}

      </TransformComponent>

    </TransformWrapper>

  );

}
