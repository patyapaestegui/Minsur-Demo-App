interface Props {
  children: React.ReactNode;
}

export default function MapViewer({ children }: Props) {
  return (
    <div
  style={{
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
>
  {children}
</div>
  );
}