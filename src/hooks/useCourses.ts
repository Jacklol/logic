import { useEffect, useState } from 'react'

interface Course {
  id: string
  name: string
  image: string
  bgColor: string
  tags: string[]
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://logiclike.com/docs/courses.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: Course[]) => {
        setCourses(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { courses, loading, error }
}
