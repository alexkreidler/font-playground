'use client'

import React, { useState, useEffect } from 'react'
import { createStyleObject } from '@capsizecss/core'
import { fontFamilyToCamelCase } from '@capsizecss/metrics'
import { entireMetricsCollection } from '@capsizecss/metrics/entireMetricsCollection'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import FontPicker from 'react-fontpicker-ts'
import 'react-fontpicker-ts/dist/index.css'

const serifGoogleFonts = [
  'EB Garamond',
  'Crimson Text',
  'Crimson Pro',
  'Spectral',
  'Merriweather',
  'Playfair Display',
  'Lora',
  'Bitter',
  'Libre Baskerville',
  'Noto Serif',
  'PT Serif',
  'Roboto Slab',
  "Alegreya",
  "Old Standard TT",
  "Vollkorn",
  "Cormorant Garamond",
];


const sansSerifGoogleFonts = [
  'Inter',
  'DM Sans',
  'Heebo',
  'IBM Plex Sans',
  'Work Sans',
  'Source Sans Pro',
  'PT Sans',
  'Noto Sans',
  'Fira Sans',
  'Rubik',
  'Karla'
];


export default function FontPlayground() {
  const [headingFont, setHeadingFont] = useState('Inter')
  const [bodyFont, setBodyFont] = useState('EB Garamond')
  const [textColor, setTextColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [width, setWidth] = useState(630)
  const [headingLineGap, setHeadingLineGap] = useState(20)
  const [bodyLineGap, setBodyLineGap] = useState(20)
  const [headingCapHeight, setHeadingCapHeight] = useState(22)
  const [bodyCapHeight, setBodyCapHeight] = useState(15)

  const getMetrics = (fontFamily) => {
    const familyName = fontFamilyToCamelCase(fontFamily)
    return entireMetricsCollection[familyName] || entireMetricsCollection['arial'] // fallback to Arial if not found
  }

  const headingMetrics = getMetrics(headingFont)
  const bodyMetrics = getMetrics(bodyFont)

  const headingStyle = createStyleObject({
    fontMetrics: headingMetrics,
    capHeight: headingCapHeight,
    lineGap: headingLineGap,
  })

  const bodyStyle = createStyleObject({
    fontMetrics: bodyMetrics,
    capHeight: bodyCapHeight,
    lineGap: bodyLineGap,
  })

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Font Playground</h1>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </nav>
      <div className="flex flex-row">
        <div className="p-4 w-1/4">
          <h2 className="text-lg font-bold mb-4">Properties</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="width">Container Width</Label>
              <Slider
                id="width"
                min={300}
                max={1200}
                step={10}
                value={[width]}
                onValueChange={(value) => setWidth(value[0])}
              />
              <span>{width}px</span>
            </div>
            <div>
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                type="color"
                id="text-color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="background-color">Background Color</Label>
              <Input
                type="color"
                id="background-color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="heading-font">Heading Font</Label>
              <FontPicker googleFonts={sansSerifGoogleFonts} autoLoad defaultValue={headingFont} value={(font1: string) => setHeadingFont(font1)} />
            </div>
            <div>
              <Label htmlFor="heading-cap-height">Heading Cap Height</Label>
              <Slider
                id="heading-cap-height"
                min={0}
                max={50}
                step={1}
                value={[headingCapHeight]}
                onValueChange={(value) => setHeadingCapHeight(value[0])}
              />
              <span>{headingCapHeight}</span>
            </div>
            <div>
              <Label htmlFor="heading-line-gap">Heading Line Gap</Label>
              <Slider
                id="heading-line-gap"
                min={0}
                max={200}
                step={0.1}
                value={[headingLineGap]}
                onValueChange={(value) => setHeadingLineGap(value[0])}
              />
              <span>{headingLineGap}</span>
            </div>
            <div>
              <Label htmlFor="body-font">Body Font</Label>
              <FontPicker googleFonts={serifGoogleFonts} autoLoad defaultValue={bodyFont} value={(font1: string) => setBodyFont(font1)} />
            </div>
            <div>
              <Label htmlFor="body-cap-height">Body Cap Height</Label>
              <Slider
                id="body-cap-height"
                min={0}
                max={50}
                step={1}
                value={[bodyCapHeight]}
                onValueChange={(value) => setBodyCapHeight(value[0])}
              />
              <span>{bodyCapHeight}</span>
            </div>
            <div>
              <Label htmlFor="body-line-gap">Body Line Gap</Label>
              <Slider
                id="body-line-gap"
                min={0}
                max={200}
                step={0.1}
                value={[bodyLineGap]}
                onValueChange={(value) => setBodyLineGap(value[0])}
              />
              <span>{bodyLineGap}</span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8" style={{ backgroundColor, width }}>
          <article style={{ color: textColor }}>
            <h1 style={{
              ...headingStyle,
              fontFamily: headingFont,
              marginBottom: '1rem',
            }}>
              The Wonders of Typography
            </h1>
            <p style={{
              ...bodyStyle,
              fontFamily: bodyFont,
              marginBottom: '1rem',
            }}>
              Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing (leading), and letter-spacing (tracking), and adjusting the space between pairs of letters (kerning).
            </p>
            <p style={{
              ...bodyStyle,
              fontFamily: bodyFont,
            }}>
              The term typography is also applied to the style, arrangement, and appearance of the letters, numbers, and symbols created by the process. Type design is a closely related craft, sometimes considered part of typography; most typographers do not design typefaces, and some type designers do not consider themselves typographers.
            </p>
          </article>
        </div>
      </div>
    </div>
  )
}