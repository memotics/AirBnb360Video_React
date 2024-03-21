import { useGLTF } from "@react-three/drei";

const ArrowPointer = () => {
    const model = useGLTF("./models/arrowTracking.glb");
    return (
        <primitive object={model.scene}>
            <meshBasicMaterial color={"red"}></meshBasicMaterial>
        </primitive>
    );
}

export default ArrowPointer;