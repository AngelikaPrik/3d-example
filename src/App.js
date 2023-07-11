import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion';

const cardContainer = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const cardItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: 'easeOut',
      },
    },
  }
}

const Card = ({ index }) => {
  const combinedVariants = {
    ...cardItem,
    ...fadeIn('right', 'spring', index * 0.5, 0.75),
  }

  return (
    <Tilt>
      <motion.div className={`card ${cardItem}`} variants={combinedVariants}>
        <div>
          <h3>This is the card number #{index + 1}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

function App() {
  const model = useGLTF('./room/kitchen-scene.glb')
  return (
    <div className='container'>
      <div className='canvas-container'>
        <Canvas
          frameloop='demand'
          shadows
          dpr={[1, 2]}
          camera={{ position: [30, 2, 5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
          flat
          linear
        >
          <OrbitControls
            enableZoom={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            autoRotate
          />
          <mesh>
            <hemisphereLight intensity={0.15} groundColor='black' />
            <spotLight
              position={[-20, 50, 10]}
              angle={0.5}
              penumbra={1}
              intensity={1}
              castShadow
              shadow-mapSize={1024}
            />
            <pointLight intensity={1} />
            <primitive object={model.scene} rotation={[0, -2, 0]} />
          </mesh>
        </Canvas>
      </div>

      <motion.div
        className={`card-container ${cardContainer}`}
        variants={cardContainer}
        initial='hidden'
        animate='visible'
      >
        {new Array(4).fill(null).map((item, i) => (
          <Card index={i} key={i} />
        ))}
      </motion.div>
    </div>
  )
}

export default App
