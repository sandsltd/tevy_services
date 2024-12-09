import BeforeAfterSlider from './BeforeAfterSlider'

interface GalleryItem {
  id: string
  title: string
  description: string
  before: string
  after: string
  damage: string
}

interface BeforeAfterGalleryProps {
  items: GalleryItem[]
}

export default function BeforeAfterGallery({ items }: BeforeAfterGalleryProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {items.map((item) => (
        <BeforeAfterSlider
          key={item.id}
          before={item.before}
          after={item.after}
          title={item.title}
          description={item.description}
          damage={item.damage}
        />
      ))}
    </div>
  )
} 