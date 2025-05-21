// Simple confetti implementation
export default function confetti({
    particleCount = 50,
    spread = 50,
    startVelocity = 30,
    decay = 0.9,
    gravity = 1,
    ticks = 200,
    origin = { x: 0.5, y: 0.5 },
    colors = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
}) {
    // Create canvas element
    const canvas = document.createElement("canvas")
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.pointerEvents = "none"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.zIndex = "999999"
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create particles
    const particles = []
    const random = (min, max) => Math.random() * (max - min) + min

    for (let i = 0; i < particleCount; i++) {
        const angle = random(0, 2 * Math.PI)
        const r = random(0, spread)

        particles.push({
            x: origin.x * canvas.width,
            y: origin.y * canvas.height,
            vx: startVelocity * Math.cos(angle) * random(0.1, 1),
            vy: startVelocity * Math.sin(angle) * random(0.1, 1),
            color: colors[Math.floor(random(0, colors.length))],
            size: random(5, 10),
            ticks: 0,
        })
    }

    // Animation loop
    let animationFrame
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle, i) => {
            particle.ticks += 1
            particle.x += particle.vx
            particle.y += particle.vy
            particle.vy += gravity
            particle.vx *= decay
            particle.vy *= decay

            ctx.beginPath()
            ctx.fillStyle = particle.color
            ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI)
            ctx.fill()

            // Remove particles that are off-screen or have existed for too long
            if (
                particle.ticks >= ticks ||
                particle.x < 0 ||
                particle.x > canvas.width ||
                particle.y < 0 ||
                particle.y > canvas.height
            ) {
                particles.splice(i, 1)
            }
        })

        if (particles.length > 0) {
            animationFrame = requestAnimationFrame(animate)
        } else {
            // Clean up when all particles are gone
            cancelAnimationFrame(animationFrame)
            document.body.removeChild(canvas)
        }
    }

    animate()
}
