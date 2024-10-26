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

export default function FontPlayground() {
  const [headingFont, setHeadingFont] = useState('Roboto')
  const [bodyFont, setBodyFont] = useState('Open Sans')
  const [textColor, setTextColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [headingLineHeight, setHeadingLineHeight] = useState(1.2)
  const [bodyLineHeight, setBodyLineHeight] = useState(1.5)
  const [width, setWidth] = useState(630)
  const [headingFontSize, setHeadingFontSize] = useState(48)
  const [bodyFontSize, setBodyFontSize] = useState(20)

  const getMetrics = (fontFamily) => {
    const familyName = fontFamilyToCamelCase(fontFamily)
    return entireMetricsCollection[familyName] || entireMetricsCollection['arial'] // fallback to Arial if not found
  }

  const headingMetrics = getMetrics(headingFont)
  const bodyMetrics = getMetrics(bodyFont)

  const headingStyle = createStyleObject({
    fontMetrics: headingMetrics,
    fontSize: headingFontSize,
    leading: headingFontSize * headingLineHeight,
  })

  const bodyStyle = createStyleObject({
    fontMetrics: bodyMetrics,
    fontSize: bodyFontSize,
    leading: bodyFontSize * bodyLineHeight,
  })

  return (
    <div className="container mx-auto p-4" style={{ backgroundColor, width }}>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="heading-font">Heading Font</Label>
          <FontPicker autoLoad defaultValue={headingFont} value={(font1: string) => setHeadingFont(font1)} />
        </div>
        <div>
          <Label htmlFor="body-font">Body Font</Label>
          <FontPicker autoLoad defaultValue={bodyFont} value={(font1: string) => setBodyFont(font1)} />
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
          <Label htmlFor="heading-line-height">Heading Line Height</Label>
          <Slider
            id="heading-line-height"
            min={1}
            max={2}
            step={0.1}
            value={[headingLineHeight]}
            onValueChange={(value) => setHeadingLineHeight(value[0])}
          />
          <span>{headingLineHeight.toFixed(1)}</span>
        </div>
        <div>
          <Label htmlFor="body-line-height">Body Line Height</Label>
          <Slider
            id="body-line-height"
            min={1}
            max={2}
            step={0.1}
            value={[bodyLineHeight]}
            onValueChange={(value) => setBodyLineHeight(value[0])}
          />
          <span>{bodyLineHeight.toFixed(1)}</span>
        </div>
        <div>
          <Label htmlFor="width">Width</Label>
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
          <Label htmlFor="heading-font-size">Heading Font Size</Label>
          <Slider
            id="heading-font-size"
            min={24}
            max={72}
            step={1}
            value={[headingFontSize]}
            onValueChange={(value) => setHeadingFontSize(value[0])}
          />
          <span>{headingFontSize}px</span>
        </div>
        <div>
          <Label htmlFor="body-font-size">Body Font Size</Label>
          <Slider
            id="body-font-size"
            min={12}
            max={36}
            step={1}
            value={[bodyFontSize]}
            onValueChange={(value) => setBodyFontSize(value[0])}
          />
          <span>{bodyFontSize}px</span>
        </div>
      </div>
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
  )
}