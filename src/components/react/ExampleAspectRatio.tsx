import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Image } from 'astro:assets';

export function ExampleAspectRatio() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"

      />
    </AspectRatio>
  )
}
