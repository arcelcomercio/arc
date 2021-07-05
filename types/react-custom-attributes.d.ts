import * as React from 'react'

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    importance?: 'low' | 'medium' | 'high'
  }
}
