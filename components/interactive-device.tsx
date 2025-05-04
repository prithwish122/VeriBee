"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export function InteractiveDevice() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentScreen, setCurrentScreen] = useState(0)
  const screens = ["Design Tool", "Research Dashboard", "Form Builder", "Data Analytics"]

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = null // Transparent background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 3
    camera.position.y = 0.5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputEncoding = THREE.sRGBEncoding
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.enableZoom = false
    controls.enablePan = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controls.minPolarAngle = Math.PI / 4 // Limit vertical rotation
    controls.maxPolarAngle = Math.PI / 2

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const purpleLight = new THREE.PointLight(0x9c27b0, 2, 10)
    purpleLight.position.set(-2, 2, 2)
    scene.add(purpleLight)

    const violetLight = new THREE.PointLight(0x673ab7, 2, 10)
    violetLight.position.set(2, -2, 2)
    scene.add(violetLight)

    // Create a MacBook model
    const macbookGroup = new THREE.Group()
    scene.add(macbookGroup)

    // Base (bottom part)
    const baseGeometry = new THREE.BoxGeometry(3, 0.1, 2)
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333,
      specular: 0x999999,
      shininess: 60,
    })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.y = -0.05
    macbookGroup.add(base)

    // Rounded corners for base
    const baseEdgeRadius = 0.05
    const baseEdgeSegments = 8
    const baseEdgeGeometry = new THREE.CylinderGeometry(
      baseEdgeRadius,
      baseEdgeRadius,
      3 - baseEdgeRadius * 2,
      baseEdgeSegments,
      1,
      false,
      0,
      Math.PI,
    )

    // Front edge
    const frontEdge = new THREE.Mesh(baseEdgeGeometry, baseMaterial)
    frontEdge.rotation.z = Math.PI / 2
    frontEdge.position.set(0, -0.05, 1 - baseEdgeRadius)
    macbookGroup.add(frontEdge)

    // Back edge
    const backEdge = new THREE.Mesh(baseEdgeGeometry, baseMaterial)
    backEdge.rotation.z = -Math.PI / 2
    backEdge.position.set(0, -0.05, -1 + baseEdgeRadius)
    macbookGroup.add(backEdge)

    // Apple logo on base
    const logoGeometry = new THREE.PlaneGeometry(0.3, 0.3)
    const logoMaterial = new THREE.MeshBasicMaterial({
      color: 0x999999,
      transparent: true,
      opacity: 0.8,
    })
    const logo = new THREE.Mesh(logoGeometry, logoMaterial)
    logo.rotation.x = -Math.PI / 2
    logo.position.y = 0.001
    logo.position.z = -0.5
    macbookGroup.add(logo)

    // Screen (top part)
    const screenBaseGeometry = new THREE.BoxGeometry(3, 0.1, 2)
    const screenBaseMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333,
      specular: 0x999999,
      shininess: 60,
    })
    const screenBase = new THREE.Mesh(screenBaseGeometry, screenBaseMaterial)
    screenBase.position.y = 1.5
    screenBase.rotation.x = -Math.PI / 6 // Tilt the screen
    macbookGroup.add(screenBase)

    // Screen bezel
    const bezelGeometry = new THREE.BoxGeometry(2.8, 0.1, 1.8)
    const bezelMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333,
      specular: 0x999999,
      shininess: 60,
    })
    const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial)
    bezel.position.y = 1.5
    bezel.position.z = 0.05
    bezel.rotation.x = -Math.PI / 6 // Match the tilt of the screen base
    macbookGroup.add(bezel)

    // Screen display
    const screenGeometry = new THREE.PlaneGeometry(2.6, 1.6)

    // Create dynamic canvas texture for the screen
    const canvas = document.createElement("canvas")
    canvas.width = 1920
    canvas.height = 1200
    const context = canvas.getContext("2d")

    // Create the texture first
    const screenTexture = new THREE.CanvasTexture(canvas)
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
    })

    // Now update the screen content after the texture is created
    if (context) {
      // Initial screen
      updateScreenContent(context, 0)
    }

    const screen = new THREE.Mesh(screenGeometry, screenMaterial)
    screen.position.y = 1.5
    screen.position.z = 0.11
    screen.rotation.x = -Math.PI / 6 // Match the tilt of the screen base
    macbookGroup.add(screen)

    // Hinge
    const hingeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 16)
    const hingeMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333,
      specular: 0x999999,
      shininess: 60,
    })
    const hinge = new THREE.Mesh(hingeGeometry, hingeMaterial)
    hinge.rotation.z = Math.PI / 2
    hinge.position.y = 0.1
    hinge.position.z = -1
    macbookGroup.add(hinge)

    // Keyboard
    const keyboardGeometry = new THREE.PlaneGeometry(2.8, 1.8)
    const keyboardMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222,
      specular: 0x666666,
      shininess: 30,
    })
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial)
    keyboard.position.y = 0.01
    keyboard.position.z = 0
    keyboard.rotation.x = -Math.PI / 2 // Flat on the base
    macbookGroup.add(keyboard)

    // Add keys to the keyboard
    const keySize = 0.15
    const keyGeometry = new THREE.BoxGeometry(keySize, keySize, 0.02)
    const keyMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333,
      specular: 0x999999,
      shininess: 30,
    })

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 10; j++) {
        const key = new THREE.Mesh(keyGeometry, keyMaterial)
        key.position.x = -1.3 + j * (keySize + 0.02)
        key.position.y = 0.02
        key.position.z = 0.7 - i * (keySize + 0.02)
        macbookGroup.add(key)
      }
    }

    // Touchpad
    const touchpadGeometry = new THREE.PlaneGeometry(1, 0.6)
    const touchpadMaterial = new THREE.MeshPhongMaterial({
      color: 0x444444,
      specular: 0x999999,
      shininess: 50,
    })
    const touchpad = new THREE.Mesh(touchpadGeometry, touchpadMaterial)
    touchpad.position.y = 0.02
    touchpad.position.z = -0.7
    touchpad.rotation.x = -Math.PI / 2 // Flat on the base
    macbookGroup.add(touchpad)

    // Function to update screen content
    function updateScreenContent(ctx: CanvasRenderingContext2D, screenIndex: number) {
      // Clear the canvas
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw the appropriate content based on screen index
      switch (screenIndex) {
        case 0:
          drawDesignToolInterface(ctx)
          break
        case 1:
          drawDashboardVideo(ctx)
          break
        case 2:
          drawFormBuilderVideo(ctx)
          break
        case 3:
          drawAnalyticsVideo(ctx)
          break
      }

      // Update the texture
      screenTexture.needsUpdate = true
    }

    function drawDesignToolInterface(ctx: CanvasRenderingContext2D) {
      const time = Date.now() * 0.001
      const frameIndex = Math.floor(time * 3) % 4 // Animation frames

      // Background
      ctx.fillStyle = "#f5f5f5"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Top navigation bar
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, 60)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, 60)
      ctx.lineTo(canvas.width, 60)
      ctx.stroke()

      // Logo
      ctx.fillStyle = "#8b5cf6"
      ctx.beginPath()
      ctx.arc(30, 30, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px Arial"
      ctx.fillText("V", 26, 34)

      // App name
      ctx.fillStyle = "#333333"
      ctx.font = "bold 16px Arial"
      ctx.fillText("VeriBee", 55, 35)

      // Navigation items
      ctx.fillStyle = "#666666"
      ctx.font = "14px Arial"
      ctx.fillText("Sitemap", 350, 35)
      ctx.fillText("Wireframe", 430, 35)
      ctx.fillText("Style Guide", 520, 35)

      // Left sidebar
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 60, 250, canvas.height - 60)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(250, 60)
      ctx.lineTo(250, canvas.height)
      ctx.stroke()

      // Concept dropdown
      ctx.fillStyle = "#f8f8f8"
      ctx.fillRect(20, 80, 210, 40)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.strokeRect(20, 80, 210, 40)
      ctx.fillStyle = "#333333"
      ctx.font = "14px Arial"
      ctx.fillText("Concept 2", 40, 105)

      // Dropdown arrow
      ctx.fillStyle = "#666666"
      ctx.beginPath()
      ctx.moveTo(210, 95)
      ctx.lineTo(220, 95)
      ctx.lineTo(215, 105)
      ctx.closePath()
      ctx.fill()

      // Colors section
      ctx.fillStyle = "#333333"
      ctx.font = "bold 16px Arial"
      ctx.fillText("Colors", 30, 150)

      // Neutrals color box
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.strokeRect(30, 170, 60, 120)
      ctx.fillStyle = "#333333"
      ctx.font = "12px Arial"
      ctx.fillText("Neutrals", 38, 190)

      // Color gradient in neutrals
      const gradient = ctx.createLinearGradient(30, 200, 30, 290)
      gradient.addColorStop(0, "#ffffff")
      gradient.addColorStop(0.5, "#888888")
      gradient.addColorStop(1, "#000000")
      ctx.fillStyle = gradient
      ctx.fillRect(30, 200, 60, 90)

      // Color swatches
      drawColorSwatch(ctx, 100, 170, "#147EFF", "Azure")
      drawColorSwatch(ctx, 170, 170, "#FA61D4", "Candy")
      drawColorSwatch(ctx, 240, 170, "#02AAD4", "Sky")
      drawColorSwatch(ctx, 170, 240, "#7700FF", "Violet")

      // Add button
      ctx.fillStyle = "#f8f8f8"
      ctx.beginPath()
      ctx.arc(260, 260, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = "#666666"
      ctx.font = "16px Arial"
      ctx.fillText("+", 255, 265)

      // Typography section
      ctx.fillStyle = "#333333"
      ctx.font = "bold 16px Arial"
      ctx.fillText("Typography", 30, 330)

      // Font selection
      ctx.fillStyle = "#f8f8f8"
      ctx.fillRect(30, 350, 210, 40)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.strokeRect(30, 350, 210, 40)
      ctx.fillStyle = "#333333"
      ctx.font = "14px Arial"
      ctx.fillText("Regular - normal", 50, 375)

      // Shuffle button
      ctx.fillStyle = "#f8f8f8"
      ctx.fillRect(400, 350, 80, 30)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.strokeRect(400, 350, 80, 30)
      ctx.fillStyle = "#333333"
      ctx.font = "12px Arial"
      ctx.fillText("Shuffle", 420, 370)

      // Headings section
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(30, 400, 200, 150)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.strokeRect(30, 400, 200, 150)

      ctx.fillStyle = "#333333"
      ctx.font = "12px Arial"
      ctx.fillText("Headings", 40, 420)

      ctx.font = "bold 28px Arial"
      ctx.fillText("Epilogue", 40, 460)

      // Google logo
      ctx.fillStyle = "#4285F4"
      ctx.beginPath()
      ctx.arc(50, 480, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "#333333"
      ctx.font = "12px Arial"
      ctx.fillText("Google", 65, 485)
      ctx.fillStyle = "#666666"
      ctx.fillText("24 styles", 110, 485)

      // Body section
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(250, 400, 200, 150)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.strokeRect(250, 400, 200, 150)

      ctx.fillStyle = "#333333"
      ctx.font = "12px Arial"
      ctx.fillText("Body", 260, 420)

      ctx.font = "bold 28px Arial"
      ctx.fillText("Inter", 260, 460)

      // Google logo
      ctx.fillStyle = "#4285F4"
      ctx.beginPath()
      ctx.arc(270, 480, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "#333333"
      ctx.font = "12px Arial"
      ctx.fillText("Google", 285, 485)
      ctx.fillStyle = "#666666"
      ctx.fillText("16 styles", 330, 485)
      ctx.fillStyle = "#4CAF50"
      ctx.fillText("Free", 380, 485)

      // UI Styling section
      ctx.fillStyle = "#333333"
      ctx.font = "bold 16px Arial"
      ctx.fillText("UI Styling", 30, 580)

      // Buttons & Forms
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(30, 600, 200, 150)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.strokeRect(30, 600, 200, 150)
      ctx.fillStyle = "#333333"
      ctx.font = "12px Arial"
      ctx.fillText("Buttons & Forms", 40, 620)

      // Cards & Images
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(250, 600, 200, 150)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.strokeRect(250, 600, 200, 150)
      ctx.fillStyle = "#333333"
      ctx.font = "12px Arial"
      ctx.fillText("Cards & Images", 260, 620)

      // Right panel - Preview
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(500, 60, canvas.width - 500, canvas.height - 60)

      // Website preview
      drawWebsitePreview(ctx, 550, 120, 600, 400, frameIndex)

      // User avatars/comments (animated based on frame)
      drawUserAvatar(ctx, 550, 110, "#FFD700", "Jason", frameIndex === 0 || frameIndex === 2)
      drawUserAvatar(ctx, 130, 420, "#FF69B4", "Melissa", frameIndex === 1 || frameIndex === 3)
      drawUserAvatar(ctx, 250, 350, "#32CD32", "Guest", frameIndex === 2 || frameIndex === 0)

      // Comment bubble
      if (frameIndex === 1 || frameIndex === 3) {
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        ctx.roundRect(600, 60, 250, 40, 10)
        ctx.fill()
        ctx.strokeStyle = "#e0e0e0"
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.fillStyle = "#333333"
        ctx.font = "12px Arial"
        ctx.fillText("I'll work on the page styling, you", 620, 85)
      }

      // Scheme shuffle button
      ctx.fillStyle = "#f8f8f8"
      ctx.fillRect(1050, 530, 120, 30)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.strokeRect(1050, 530, 120, 30)
      ctx.fillStyle = "#333333"
      ctx.font = "12px Arial"
      ctx.fillText("Scheme shuffle", 1070, 550)

      // Animated cursor based on frame
      if (frameIndex === 0) {
        drawCursor(ctx, 220, 375)
      } else if (frameIndex === 1) {
        drawCursor(ctx, 420, 460)
      } else if (frameIndex === 2) {
        drawCursor(ctx, 300, 620)
      } else {
        drawCursor(ctx, 1070, 550)
      }
    }

    function drawColorSwatch(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, name: string) {
      // Swatch background
      ctx.fillStyle = color
      ctx.fillRect(x, y, 60, 60)

      // Swatch name
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px Arial"
      ctx.fillText(name, x + 10, y + 20)

      // Color code
      ctx.fillStyle = "#ffffff"
      ctx.font = "10px Arial"
      ctx.fillText(color.toUpperCase(), x + 10, y + 40)

      // Slider lines
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x + 10, y + 50)
      ctx.lineTo(x + 50, y + 50)
      ctx.stroke()
    }

    function drawUserAvatar(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      color: string,
      name: string,
      isActive: boolean,
    ) {
      // Avatar circle
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, 20, 0, Math.PI * 2)
      ctx.fill()

      // Name
      ctx.fillStyle = "#333333"
      ctx.font = "12px Arial"
      ctx.fillText(name, x - 15, y + 5)

      // Active indicator
      if (isActive) {
        ctx.strokeStyle = "#32CD32"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, 23, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    function drawCursor(ctx: CanvasRenderingContext2D, x: number, y: number) {
      ctx.fillStyle = "#000000"
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + 10, y + 10)
      ctx.lineTo(x + 4, y + 10)
      ctx.lineTo(x + 4, y + 16)
      ctx.lineTo(x, y)
      ctx.fill()
    }

    function drawWebsitePreview(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      frameIndex: number,
    ) {
      // Website container
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(x, y, width, height)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.strokeRect(x, y, width, height)

      // Website header
      ctx.fillStyle = "#f8f8f8"
      ctx.fillRect(x, y, width, 40)
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, y + 40)
      ctx.lineTo(x + width, y + 40)
      ctx.stroke()

      // Logo
      ctx.fillStyle = "#FFD700"
      ctx.beginPath()
      ctx.roundRect(x + 20, y + 10, 60, 20, 10)
      ctx.fill()
      ctx.fillStyle = "#333333"
      ctx.font = "bold 12px Arial"
      ctx.fillText("Jason", x + 35, y + 25)

      // Navigation
      ctx.fillStyle = "#333333"
      ctx.font = "12px Arial"
      ctx.fillText("Home", x + width - 150, y + 25)
      ctx.fillText("About", x + width - 100, y + 25)
      ctx.fillText("Contact", x + width - 50, y + 25)

      // Hero section
      ctx.fillStyle = "#f8f8f8"
      ctx.fillRect(x, y + 40, width, 150)

      // Headline
      ctx.fillStyle = "#333333"
      ctx.font = "bold 24px Arial"
      ctx.fillText("Clarity You Can", x + 20, y + 80)
      ctx.fillText("Trust in Health", x + 20, y + 110)
      ctx.fillText("Insurance", x + 20, y + 140)

      // Subheadline
      ctx.fillStyle = "#666666"
      ctx.font = "12px Arial"
      ctx.fillText("We're here to help you navigate the complex", x + 20, y + 170)
      ctx.fillText("world of health insurance. Let's find the", x + 20, y + 185)
      ctx.fillText("best plan that's right for you.", x + 20, y + 200)

      // CTA Buttons
      ctx.fillStyle = "#147EFF"
      ctx.beginPath()
      ctx.roundRect(x + 20, y + 220, 80, 30, 5)
      ctx.fill()
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px Arial"
      ctx.fillText("Get Started", x + 35, y + 240)

      ctx.strokeStyle = "#147EFF"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(x + 110, y + 220, 80, 30, 5)
      ctx.stroke()
      ctx.fillStyle = "#147EFF"
      ctx.font = "12px Arial"
      ctx.fillText("Get a quote", x + 125, y + 240)

      // Hero image
      ctx.fillStyle = "#e0e0e0"
      ctx.beginPath()
      ctx.roundRect(x + width - 200, y + 60, 180, 180, 10)
      ctx.fill()

      // Feature cards
      const cardWidth = width / 2 - 30
      const cardHeight = 100

      // Card 1
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.roundRect(x + 20, y + 260, cardWidth, cardHeight, 5)
      ctx.fill()
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.fillStyle = "#333333"
      ctx.font = "bold 14px Arial"
      ctx.fillText("Find the right plan", x + 40, y + 290)
      ctx.fillText("for you", x + 40, y + 310)

      // Card 2
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.roundRect(x + width - cardWidth - 20, y + 260, cardWidth, cardHeight, 5)
      ctx.fill()
      ctx.strokeStyle = "#e0e0e0"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.fillStyle = "#333333"
      ctx.font = "bold 14px Arial"
      ctx.fillText("Choose the right", x + width - cardWidth, y + 290)
      ctx.fillText("cover level", x + width - cardWidth, y + 310)

      // Banner
      ctx.fillStyle = "#147EFF"
      ctx.fillRect(x, y + 370, width, 80)

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 16px Arial"
      ctx.fillText("Switch to our health insurance to earn points", x + 20, y + 410)

      // Animated elements based on frame
      if (frameIndex === 1 || frameIndex === 3) {
        // Highlight effect on buttons
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.beginPath()
        ctx.roundRect(x + 20, y + 220, 80, 30, 5)
        ctx.fill()

        // Animated arrow
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        ctx.moveTo(x + width - 50, y + 400)
        ctx.lineTo(x + width - 30, y + 410)
        ctx.lineTo(x + width - 50, y + 420)
        ctx.closePath()
        ctx.fill()
      }
    }

    function drawDashboardVideo(ctx: CanvasRenderingContext2D) {
      const time = Date.now() * 0.001
      const frameIndex = Math.floor(time * 5) % 4 // 4 different "frames" to simulate video

      // Background
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Full screen video display
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dashboard title with animation
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 32px Arial"
      ctx.fillText("Research Dashboard", canvas.width / 2 - 150, 100)

      // Animated stats boxes
      const boxHeight = frameIndex % 2 === 0 ? 150 : 155 // Subtle animation

      // Stats boxes with pulsing effect
      drawAnimatedStatsBox(ctx, canvas.width / 2 - 350, 150, "Active Studies", "24", frameIndex)
      drawAnimatedStatsBox(ctx, canvas.width / 2 - 150, 150, "Participants", "1,245", frameIndex)
      drawAnimatedStatsBox(ctx, canvas.width / 2 + 50, 150, "Completion Rate", "87%", frameIndex)
      drawAnimatedStatsBox(ctx, canvas.width / 2 + 250, 150, "Tokens", "45,230", frameIndex)

      // Animated chart
      drawAnimatedChart(ctx, 200, 350, canvas.width - 400, 300, frameIndex)

      // Animated data points appearing
      if (frameIndex > 0) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "16px Arial"
        ctx.fillText("• New responses coming in from US region", 220, 680)
      }

      if (frameIndex > 1) {
        ctx.fillText("• AI detected 3 potential spam responses", 220, 710)
      }

      if (frameIndex > 2) {
        ctx.fillText("• Token distribution scheduled for tomorrow", 220, 740)
      }

      // Overlay UI elements - Navbar at top
      drawNavbar(ctx)

      // Video controls at bottom
      drawVideoControls(ctx)

      // Floating 3D elements as overlays
      drawFloatingElements(ctx)
    }

    function drawFormBuilderVideo(ctx: CanvasRenderingContext2D) {
      const frameIndex = Math.floor(Date.now() * 0.003) % 4 // 4 different "frames" to simulate video

      // Background
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Form Builder title
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 32px Arial"
      ctx.fillText("Form Builder", canvas.width / 2 - 100, 100)

      // Form being built with animation
      ctx.fillStyle = "#111111"
      ctx.fillRect(200, 150, canvas.width - 400, 500)

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 24px Arial"
      ctx.fillText("Consumer Behavior Survey", 250, 190)

      // Form fields appearing one by one based on frame
      const numFields = Math.min(frameIndex + 2, 5)

      for (let i = 0; i < numFields; i++) {
        // Field background
        ctx.fillStyle = "#222222"
        ctx.fillRect(250, 230 + i * 80, canvas.width - 500, 60)

        // Field labels
        ctx.fillStyle = "#aaaaaa"
        ctx.font = "18px Arial"

        const labels = ["Full Name", "Email Address", "Age Group", "Shopping Frequency", "Additional Comments"]

        ctx.fillText(labels[i], 270, 265 + i * 80)

        // Show typing animation in the first field
        if (i === 0 && frameIndex % 2 === 0) {
          ctx.fillStyle = "#ffffff"
          ctx.fillText("John Doe|", 270, 265)
        } else if (i === 0) {
          ctx.fillStyle = "#ffffff"
          ctx.fillText("John Doe", 270, 265)
        }
      }

      // Animated cursor for form building
      const cursorY = 230 + (numFields - 1) * 80 + 30
      if (frameIndex % 2 === 0) {
        ctx.fillStyle = "#8b5cf6"
        ctx.fillRect(canvas.width / 2, cursorY, 10, 10)
      }

      // Overlay UI elements - Navbar at top
      drawNavbar(ctx)

      // Video controls at bottom
      drawVideoControls(ctx)
    }

    function drawAnalyticsVideo(ctx: CanvasRenderingContext2D) {
      const frameIndex = Math.floor(Date.now() * 0.003) % 4 // 4 different "frames" to simulate video

      // Background
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Analytics title
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 32px Arial"
      ctx.fillText("Data Analytics", canvas.width / 2 - 120, 100)

      // Animated charts
      // Pie chart with rotating segments
      ctx.save()
      ctx.translate(canvas.width / 4, 350)
      ctx.rotate(frameIndex * 0.1)

      const pieColors = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#4c1d95"]
      const pieAngles = [0, Math.PI * 0.5, Math.PI * 1.2, Math.PI * 1.8, Math.PI * 2]

      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = pieColors[i]
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.arc(0, 0, 150, pieAngles[i], pieAngles[i + 1])
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()

      // Bar chart with growing bars
      const barWidth = 60
      const barSpacing = 40
      const barMaxHeight = 250
      const numBars = 5
      const barX = canvas.width / 2 + 100

      for (let i = 0; i < numBars; i++) {
        // Calculate height based on frame for animation
        const heightPercent = Math.min(1, (frameIndex + 1) / 3)
        const barHeight = [0.7, 0.9, 0.5, 0.8, 0.6][i] * barMaxHeight * heightPercent

        ctx.fillStyle = "#8b5cf6"
        ctx.fillRect(barX + i * (barWidth + barSpacing), 500 - barHeight, barWidth, barHeight)

        // Labels
        ctx.fillStyle = "#ffffff"
        ctx.font = "14px Arial"
        ctx.fillText(
          ["Mon", "Tue", "Wed", "Thu", "Fri"][i],
          barX + i * (barWidth + barSpacing) + barWidth / 2 - 15,
          520,
        )

        // Values
        if (frameIndex > 1) {
          ctx.fillText(
            [`70%`, `90%`, `50%`, `80%`, `60%`][i],
            barX + i * (barWidth + barSpacing) + barWidth / 2 - 15,
            490 - barHeight,
          )
        }
      }

      // Data insights appearing
      if (frameIndex > 0) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 20px Arial"
        ctx.fillText("AI-Generated Insights:", 250, 600)

        ctx.font = "16px Arial"
        ctx.fillText("• Response rate peaks on Tuesdays (90%)", 250, 640)
      }

      if (frameIndex > 1) {
        ctx.fillText("• 65% of participants are in 25-34 age group", 250, 670)
      }

      if (frameIndex > 2) {
        ctx.fillText("• Engagement increases with token incentives", 250, 700)
      }

      // Overlay UI elements - Navbar at top
      drawNavbar(ctx)

      // Video controls at bottom
      drawVideoControls(ctx)
    }

    function drawNavbar(ctx: CanvasRenderingContext2D) {
      // Semi-transparent navbar overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(0, 0, canvas.width, 60)

      // Logo
      ctx.fillStyle = "#8b5cf6"
      ctx.beginPath()
      ctx.arc(40, 30, 20, 0, Math.PI * 2)
      ctx.fill()

      // Nav text
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 16px Arial"
      ctx.fillText("VeriBee", 70, 35)

      ctx.font = "14px Arial"
      ctx.fillStyle = "#aaaaaa"
      ctx.fillText("How It Works", 180, 35)
      ctx.fillText("Features", 300, 35)
      ctx.fillText("Pricing", 400, 35)
      ctx.fillText("Docs", 500, 35)

      // Buttons
      ctx.strokeStyle = "#8b5cf6"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(canvas.width - 200, 15, 80, 30, 15)
      ctx.stroke()
      ctx.fillStyle = "#aaaaaa"
      ctx.fillText("Faucet", canvas.width - 170, 35)

      ctx.fillStyle = "#8b5cf6"
      ctx.beginPath()
      ctx.roundRect(canvas.width - 100, 15, 80, 30, 15)
      ctx.fill()
      ctx.fillStyle = "#ffffff"
      // ctx.fillText("OCID Login", canvas.width - 70, 35)
    }

    function drawVideoControls(ctx: CanvasRenderingContext2D) {
      // Semi-transparent control bar
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40)

      // Play button
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.moveTo(30, canvas.height - 30)
      ctx.lineTo(30, canvas.height - 10)
      ctx.lineTo(50, canvas.height - 20)
      ctx.closePath()
      ctx.fill()

      // Progress bar
      ctx.fillStyle = "#333333"
      ctx.fillRect(70, canvas.height - 20, canvas.width - 140, 4)

      // Progress indicator (changes with time)
      const progress = (Date.now() % 20000) / 20000 // 20-second loop
      ctx.fillStyle = "#8b5cf6"
      ctx.fillRect(70, canvas.height - 20, (canvas.width - 140) * progress, 4)

      // Time indicator
      const minutes = Math.floor(progress * 5) // 5-minute video
      const seconds = Math.floor((progress * 5 * 60) % 60)
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px Arial"
      ctx.fillText(`${minutes}:${seconds.toString().padStart(2, "0")} / 5:00`, canvas.width - 60, canvas.height - 15)
    }

    function drawAnimatedStatsBox(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      title: string,
      value: string,
      frameIndex: number,
    ) {
      // Box with subtle pulsing effect
      const glowIntensity = frameIndex % 2 === 0 ? 0.1 : 0.2

      // Glow effect
      ctx.fillStyle = `rgba(139, 92, 246, ${glowIntensity})`
      ctx.filter = "blur(10px)"
      ctx.beginPath()
      ctx.roundRect(x, y, 180, 100, 10)
      ctx.fill()
      ctx.filter = "none"

      // Box background
      ctx.fillStyle = "#111111"
      ctx.beginPath()
      ctx.roundRect(x, y, 180, 100, 10)
      ctx.fill()

      // Content
      ctx.fillStyle = "#aaaaaa"
      ctx.font = "14px Arial"
      ctx.fillText(title, x + 15, y + 30)

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 28px Arial"
      ctx.fillText(value, x + 15, y + 70)
    }

    function drawAnimatedChart(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      frameIndex: number,
    ) {
      // Chart background
      ctx.fillStyle = "#111111"
      ctx.beginPath()
      ctx.roundRect(x, y, width, height, 10)
      ctx.fill()

      // Chart title
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 20px Arial"
      ctx.fillText("Response Trends", x + 20, y + 30)

      // Chart grid
      ctx.strokeStyle = "#333333"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(x + 50, y + 70 + i * 50)
        ctx.lineTo(x + width - 50, y + 70 + i * 50)
        ctx.stroke()
      }

      // Data points with animation
      const dataPoints = [30, 45, 25, 60, 40, 75, 55]
      const visiblePoints = Math.min(dataPoints.length, frameIndex + 3)
      const pointSpacing = (width - 100) / (dataPoints.length - 1)

      // Draw line
      ctx.strokeStyle = "#8b5cf6"
      ctx.lineWidth = 3
      ctx.beginPath()

      for (let i = 0; i < visiblePoints; i++) {
        const pointX = x + 50 + i * pointSpacing
        const pointY = y + 220 - dataPoints[i] * 2

        if (i === 0) {
          ctx.moveTo(pointX, pointY)
        } else {
          ctx.lineTo(pointX, pointY)
        }
      }

      ctx.stroke()

      // Draw points
      for (let i = 0; i < visiblePoints; i++) {
        const pointX = x + 50 + i * pointSpacing
        const pointY = y + 220 - dataPoints[i] * 2

        // Pulsing effect for the newest point
        const pointSize = i === visiblePoints - 1 && frameIndex % 2 === 0 ? 7 : 5

        ctx.fillStyle = i === visiblePoints - 1 ? "#ffffff" : "#8b5cf6"
        ctx.beginPath()
        ctx.arc(pointX, pointY, pointSize, 0, Math.PI * 2)
        ctx.fill()

        // Value labels
        if (i === visiblePoints - 1) {
          ctx.fillStyle = "#ffffff"
          ctx.font = "14px Arial"
          ctx.fillText(dataPoints[i].toString(), pointX - 10, pointY - 15)
        }
      }

      // X-axis labels
      ctx.fillStyle = "#aaaaaa"
      ctx.font = "14px Arial"

      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      for (let i = 0; i < Math.min(days.length, visiblePoints); i++) {
        const labelX = x + 50 + i * pointSpacing
        ctx.fillText(days[i], labelX - 15, y + 250)
      }
    }

    function drawFloatingElements(ctx: CanvasRenderingContext2D) {
      // Draw some floating 3D wireframe elements
      const time = Date.now() * 0.001

      // Draw hexagons
      ctx.strokeStyle = "#8b5cf6"
      ctx.lineWidth = 1

      for (let i = 0; i < 5; i++) {
        const x = canvas.width * 0.1 + Math.sin(time * 0.5 + i) * 50
        const y = canvas.height * 0.2 + Math.cos(time * 0.3 + i) * 30
        const size = 20 + Math.sin(time + i) * 5

        drawHexagon(ctx, x, y, size)
      }

      for (let i = 0; i < 5; i++) {
        const x = canvas.width * 0.9 + Math.sin(time * 0.4 + i) * 50
        const y = canvas.height * 0.7 + Math.cos(time * 0.6 + i) * 30
        const size = 15 + Math.sin(time + i) * 5

        drawHexagon(ctx, x, y, size)
      }

      // Draw cubes
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * 0.15 + Math.sin(time * 0.3 + i) * 30
        const y = canvas.height * 0.8 + Math.cos(time * 0.5 + i) * 20
        const size = 25 + Math.sin(time + i) * 5

        drawCube(ctx, x, y, size)
      }
    }

    function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = ((Math.PI * 2) / 6) * i
        const px = x + Math.cos(angle) * size
        const py = y + Math.sin(angle) * size
        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }

    function drawCube(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      const halfSize = size / 2

      // Front face
      ctx.beginPath()
      ctx.moveTo(x - halfSize, y - halfSize)
      ctx.lineTo(x + halfSize, y - halfSize)
      ctx.lineTo(x + halfSize, y + halfSize)
      ctx.lineTo(x - halfSize, y + halfSize)
      ctx.closePath()
      ctx.stroke()

      // Back face
      ctx.beginPath()
      ctx.moveTo(x - halfSize + 10, y - halfSize - 10)
      ctx.lineTo(x + halfSize + 10, y - halfSize - 10)
      ctx.lineTo(x + halfSize + 10, y + halfSize - 10)
      ctx.lineTo(x - halfSize + 10, y + halfSize - 10)
      ctx.closePath()
      ctx.stroke()

      // Connecting lines
      ctx.beginPath()
      ctx.moveTo(x - halfSize, y - halfSize)
      ctx.lineTo(x - halfSize + 10, y - halfSize - 10)
      ctx.moveTo(x + halfSize, y - halfSize)
      ctx.lineTo(x + halfSize + 10, y - halfSize - 10)
      ctx.moveTo(x + halfSize, y + halfSize)
      ctx.lineTo(x + halfSize + 10, y + halfSize - 10)
      ctx.moveTo(x - halfSize, y + halfSize)
      ctx.lineTo(x - halfSize + 10, y + halfSize - 10)
      ctx.stroke()
    }

    // Change screen content every few seconds
    const screenTimer = setInterval(() => {
      const nextScreen = (currentScreen + 1) % screens.length
      setCurrentScreen(nextScreen)
      if (context) {
        updateScreenContent(context, nextScreen)
      }
    }, 5000)

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Update controls
      controls.update()

      // Animate purple light
      const time = Date.now() * 0.001
      purpleLight.position.x = Math.sin(time) * 3
      purpleLight.position.z = Math.cos(time) * 3

      // Render
      renderer.render(scene, camera)
    }

    animate()
    setIsLoaded(true)

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
      clearInterval(screenTimer)

      // Dispose resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose()

          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        }
      })

      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full aspect-[16/9] bg-gradient-to-b from-black to-violet-950/20 rounded-lg overflow-hidden border border-violet-800/30"
      />

      {isLoaded && (
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-violet-800/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-white text-sm">
            Currently viewing: <span className="text-violet-400 font-semibold">{screens[currentScreen]}</span>
          </p>
        </motion.div>
      )}
    </div>
  )
}
