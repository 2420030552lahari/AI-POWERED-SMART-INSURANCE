"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { cn } from "@/lib/utils"
import { Upload, X, FileIcon } from "lucide-react"
import { Button } from "./button"

interface FileUploaderProps {
  accept?: string
  maxSize?: number // in MB
  onFileSelect: (file: File) => void
  onFileRemove?: () => void
  className?: string
  label?: string
}

export function FileUploader({
  accept = "image/*,.pdf",
  maxSize = 5,
  onFileSelect,
  onFileRemove,
  className,
  label = "Upload File",
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string>("")
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (selectedFile: File) => {
    setError("")

    if (maxSize && selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    setFile(selectedFile)
    onFileSelect(selectedFile)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleRemove = () => {
    setFile(null)
    setError("")
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    onFileRemove?.()
  }

  return (
    <div className={cn("w-full", className)}>
      {!file ? (
        <div
          className={cn(
            "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors",
            dragActive ? "border-primary bg-accent" : "border-muted",
            "hover:border-primary hover:bg-accent/50",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
          <p className="mb-2 text-sm font-medium">{label}</p>
          <p className="mb-4 text-xs text-muted-foreground">Drag and drop or click to browse</p>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
            id="file-upload"
          />
          <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
            Select File
          </Button>
          {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <FileIcon className="h-8 w-8 text-primary" />
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={handleRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
