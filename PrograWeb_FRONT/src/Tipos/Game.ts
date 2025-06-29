// Juego (Game) - principal
export type Game = {
    rating?: number
    id: string
    image?: string
    titulo: string
    description?: string
    precio: number
    categoria_id?: number
    esta_oferta?: boolean
    estado?: boolean
    videoURL?: string
    detalleImagenes?: string[]

    // Relaciones:
    categoria?: Category
    plataformas?: Platform[]
    ventas?: Sale[]
}

// Plataforma (muchos a muchos con Juego)
export type Platform = {
    id: number
    nombre: string
}

// Categoría (uno a muchos con Juego)
export type Category = {
    id: number
    nombre: string
}

// Usuario (uno a muchos con Venta y Calificación)
export type User = {
    id: number
    correo: string
    password: string
    nombre: string
    token: string
    estado: boolean
}

// Noticia (sin relaciones)
export type News = {
    id: number
    titulo: string
    texto: string
    activo: boolean
}

// Venta (muchos a uno con Juego y Usuario)
export type Sale = {
    id: number
    fecha: string // o Date si usas objetos Date
    usuario_id: number
    juego_id: number
    codigo: string
    monto_pagado: number
}
