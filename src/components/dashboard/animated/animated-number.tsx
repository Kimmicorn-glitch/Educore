"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

interface AnimatedNumberProps {
  value: number
  duration?: number
}

export const AnimatedNumber = ({ value, duration = 1.5 }: AnimatedNumberProps) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
    })
    return controls.stop
  }, [value, count, duration])

  return <motion.span>{rounded}</motion.span>
}
