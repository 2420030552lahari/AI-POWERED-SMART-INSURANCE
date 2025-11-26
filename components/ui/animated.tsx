"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations"

interface AnimatedSectionProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface AnimatedListProps {
    children: React.ReactNode
    className?: string
}

export function AnimatedList({ children, className = "" }: AnimatedListProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function AnimatedListItem({ children, className = "" }: AnimatedListProps) {
    return (
        <motion.div
            variants={staggerItem}
            className={className}
        >
            {children}
        </motion.div>
    )
}
