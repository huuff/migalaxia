import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import { Link } from 'react-router-dom';




const EmblaCarousel = (props) => {
  const {options, slides} = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })


  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef} style={{maxWidth: "70%", margin: "0 auto"}}>
        <div className="embla__container">
          {slides.map((slide,index) => (
            <div className="embla__slide" key={index} style={{maxWidth: "400px"}}>
              <img src={slide.imageUrl} alt={`Imagen del planeta ${index + 1}`} style={{ width: '100%', height: '400px' }} />
              <Link to= {slide.path} style= {{display: "block"}} aria-label={'Más información sobre ' + slide.name} tabIndex="-1">Más información</Link>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((slide,index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                name={slide.name}
                url={slide.path}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
