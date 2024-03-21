import { useGLTF } from "@react-three/drei";

const Plaque = () =>
{
    const model = useGLTF('./models/Plaque.glb');
    return (
        <primitive object={model.scene}> </primitive>
    );
}

export default Plaque;