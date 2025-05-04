"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create floating objects
    const objects: THREE.Mesh[] = []
    const shapes = [
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.BoxGeometry(0.6, 0.6, 0.6),
      new THREE.TorusGeometry(0.4, 0.2, 16, 32),
      new THREE.ConeGeometry(0.4, 0.8, 16),
      new THREE.DodecahedronGeometry(0.5, 0),
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.TetrahedronGeometry(0.5, 0),
      new THREE.SphereGeometry(0.4, 16, 16),
    ]

    // Materials with different colors
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x9c27b0, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x673ab7, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x7e57c2, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x5e35b1, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x512da8, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x4527a0, wireframe: true }),
    ]

    // Create 20 random objects
    for (let i = 0; i < 20; i++) {
      const shapeIndex = Math.floor(Math.random() * shapes.length)
      const materialIndex = Math.floor(Math.random() * materials.length)

      const mesh = new THREE.Mesh(shapes[shapeIndex], materials[materialIndex])

      // Random position
      mesh.position.x = (Math.random() - 0.5) * 20
      mesh.position.y = (Math.random() - 0.5) * 20
      mesh.position.z = (Math.random() - 0.5) * 10 - 5

      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI

      // Store random rotation speeds
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
        },
      }

      scene.add(mesh)
      objects.push(mesh)
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate and float each object
      objects.forEach((obj) => {
        // Rotate
        obj.rotation.x += obj.userData.rotationSpeed.x
        obj.rotation.y += obj.userData.rotationSpeed.y
        obj.rotation.z += obj.userData.rotationSpeed.z

        // Float movement
        obj.position.x += obj.userData.floatSpeed.x
        obj.position.y += obj.userData.floatSpeed.y

        // Boundary check and reverse direction if needed
        if (Math.abs(obj.position.x) > 15) {
          obj.userData.floatSpeed.x *= -1
        }
        if (Math.abs(obj.position.y) > 15) {
          obj.userData.floatSpeed.y *= -1
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose geometries and materials
      objects.forEach((obj) => {
        obj.geometry.dispose()
        ;(obj.material as THREE.Material).dispose()
      })
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}
