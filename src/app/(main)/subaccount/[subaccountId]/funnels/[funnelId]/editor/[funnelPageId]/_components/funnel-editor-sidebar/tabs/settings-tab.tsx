'use client'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AlignCenter,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  ChevronsLeftRightIcon,
  LucideImageDown,
} from 'lucide-react'
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEditor } from '@/providers/editor/editor-provider'
import { Slider } from '@/components/ui/slider'

type Props = {}

const SettingsTab = (props: Props) => {
  const { state, dispatch } = useEditor()

  const handleOnChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    const styleObject = {
      [id]: value,
    }

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    })
  }

  const handleChangeCustomValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const settingProperty = e.target.id
    let value = e.target.value
    const styleObject = {
      [settingProperty]: value,
    }

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    })
  }

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Typography', 'Dimensions', 'Decorations', 'Flexbox']}
    >
      {/* Custom Settings */}
      <AccordionItem
        value="Custom"
        className="px-6 py-0"
      >
        <AccordionTrigger className="!no-underline">Custom</AccordionTrigger>
        <AccordionContent>
          {state.editor.selectedElement.type === 'link' &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Link Path</p>
                <Input
                  id="href"
                  placeholder="https://domain.example.com/pathname"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.href}
                />
              </div>
            )}
        </AccordionContent>
      </AccordionItem>

      {/* Typography Settings */}
      <AccordionItem
        value="Typography"
        className="px-6 py-0 border-y-[1px]"
      >
        <AccordionTrigger className="!no-underline">
          Typography
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {/* Text Align */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Text Align</p>
            <Tabs
              onValueChange={(value) =>
                handleOnChanges({
                  target: {
                    id: 'textAlign',
                    value: value,
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              value={state.editor.selectedElement.styles.textAlign}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="left"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignLeft size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="right"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignRight size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="center"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignCenter size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="justify"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignJustify size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Font Family */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Font Family</p>
            <Select
              onValueChange={(value) =>
                handleOnChanges({
                  target: {
                    id: 'fontFamily',
                    value: value,
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              value={state.editor.selectedElement.styles.fontFamily || ''}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a font family" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Font Families</SelectLabel>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Verdana">Verdana</SelectItem>
                  <SelectItem value="'Times New Roman'">Times New Roman</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="'Courier New'">Courier New</SelectItem>
                  <SelectItem value="'DM Sans'">DM Sans</SelectItem>
                  <SelectItem value="'Roboto'">Roboto</SelectItem>
                  <SelectItem value="'Open Sans'">Open Sans</SelectItem>
                  <SelectItem value="'Lato'">Lato</SelectItem>
                  {/* Add more font families as needed */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Color */}
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Color</p>
            <Input
              id="color"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.color}
              placeholder="#FFFFFF"
            />
          </div>

          {/* Font Weight and Size */}
          <div className="flex gap-4">
            {/* Font Weight */}
            <div>
              <Label className="text-muted-foreground">Weight</Label>
              <Select
                onValueChange={(value) =>
                  handleOnChanges({
                    target: {
                      id: 'font-weight',
                      value: value,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Font Weights</SelectLabel>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="normal">Regular</SelectItem>
                    <SelectItem value="lighter">Light</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div>
              <Label className="text-muted-foreground">Size</Label>
              <Input
                placeholder="px"
                id="fontSize"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.fontSize}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Dimensions Settings */}
      <AccordionItem
        value="Dimensions"
        className="px-6 py-0"
      >
        <AccordionTrigger className="!no-underline">
          Dimensions
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            {/* Height and Width */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <div>
                  <Label className="text-muted-foreground">Height</Label>
                  <Input
                    id="height"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.height}
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground">Width</Label>
                  <Input
                    id="width"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.width}
                  />
                </div>
              </div>
            </div>

            {/* Margin */}
            <p className="text-muted-foreground">Margin (px)</p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div>
                  <Label className="text-muted-foreground">Top</Label>
                  <Input
                    id="marginTop"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginTop}
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground">Bottom</Label>
                  <Input
                    id="marginBottom"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginBottom}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Label className="text-muted-foreground">Left</Label>
                  <Input
                    id="marginLeft"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginLeft}
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground">Right</Label>
                  <Input
                    id="marginRight"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginRight}
                  />
                </div>
              </div>
            </div>

            {/* Padding */}
            <p className="text-muted-foreground">Padding (px)</p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div>
                  <Label className="text-muted-foreground">Top</Label>
                  <Input
                    id="paddingTop"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingTop}
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground">Bottom</Label>
                  <Input
                    id="paddingBottom"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingBottom}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Label className="text-muted-foreground">Left</Label>
                  <Input
                    id="paddingLeft"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingLeft}
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground">Right</Label>
                  <Input
                    id="paddingRight"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingRight}
                  />
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Decorations Settings */}
      <AccordionItem
        value="Decorations"
        className="px-6 py-0"
      >
        <AccordionTrigger className="!no-underline">
          Decorations
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          {/* Opacity */}
          <div>
            <Label className="text-muted-foreground">Opacity</Label>
            <div className="flex items-center justify-end">
              <small className="p-2">
                {typeof state.editor.selectedElement.styles?.opacity === 'number'
                  ? state.editor.selectedElement.styles.opacity
                  : parseFloat(
                      (state.editor.selectedElement.styles?.opacity || '0').replace('%', '')
                    ) || 0}
                %
              </small>
            </div>
            <Slider
              onValueChange={(value) => {
                handleOnChanges({
                  target: {
                    id: 'opacity',
                    value: `${value[0]}%`,
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }}
              defaultValue={[
                typeof state.editor.selectedElement.styles?.opacity === 'number'
                  ? state.editor.selectedElement.styles.opacity
                  : parseFloat(
                      (state.editor.selectedElement.styles?.opacity || '0').replace('%', '')
                    ) || 0,
              ]}
              max={100}
              step={1}
            />
          </div>

          {/* Border Radius */}
          <div>
            <Label className="text-muted-foreground">Border Radius</Label>
            <div className="flex items-center justify-end">
              <small className="">
                {typeof state.editor.selectedElement.styles?.borderRadius === 'number'
                  ? state.editor.selectedElement.styles.borderRadius
                  : parseFloat(
                      (state.editor.selectedElement.styles?.borderRadius || '0').replace('px', '')
                    ) || 0}
                px
              </small>
            </div>
            <Slider
              onValueChange={(value) => {
                handleOnChanges({
                  target: {
                    id: 'borderRadius',
                    value: `${value[0]}px`,
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }}
              defaultValue={[
                typeof state.editor.selectedElement.styles?.borderRadius === 'number'
                  ? state.editor.selectedElement.styles.borderRadius
                  : parseFloat(
                      (state.editor.selectedElement.styles?.borderRadius || '0').replace('px', '')
                    ) || 0,
              ]}
              max={100}
              step={1}
            />
          </div>

          {/* Background Color */}
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Color</Label>
            <div className="flex border-[1px] rounded-md overflow-clip">
              <div
                className="w-12"
                style={{
                  backgroundColor: state.editor.selectedElement.styles.backgroundColor,
                }}
              />
              <Input
                placeholder="#FFFFFF"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundColor"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.backgroundColor}
              />
            </div>
          </div>

          {/* Background Image */}
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Image</Label>
            <div className="flex border-[1px] rounded-md overflow-clip">
              <div
                className="w-12"
                style={{
                  backgroundImage: `url(${state.editor.selectedElement.styles.backgroundImage})`,
                }}
              />
              <Input
                placeholder="url()"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundImage"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.backgroundImage}
              />
            </div>
          </div>

          {/* Image Position */}
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Image Position</Label>
            <Tabs
              onValueChange={(value) =>
                handleOnChanges({
                  target: {
                    id: 'backgroundSize',
                    value: value,
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              value={state.editor.selectedElement.styles.backgroundSize?.toString()}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="cover"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <ChevronsLeftRightIcon size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="contain"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignVerticalJustifyCenter size={22} />
                </TabsTrigger>
                <TabsTrigger
                  value="auto"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <LucideImageDown size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Flexbox Settings */}
      <AccordionItem
        value="Flexbox"
        className="px-6 py-0"
      >
        <AccordionTrigger className="!no-underline">Flexbox</AccordionTrigger>
        <AccordionContent>
          {/* Justify Content */}
          <Label className="text-muted-foreground">Justify Content</Label>
          <Tabs
            onValueChange={(value) =>
              handleOnChanges({
                target: {
                  id: 'justifyContent',
                  value: value,
                },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            value={state.editor.selectedElement.styles.justifyContent}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
              <TabsTrigger
                value="space-between"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalSpaceBetween size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="space-evenly"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalSpaceAround size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="center"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalJustifyCenterIcon size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="start"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalJustifyStart size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="end"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalJustifyEndIcon size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Align Items */}
          <Label className="text-muted-foreground">Align Items</Label>
          <Tabs
            onValueChange={(value) =>
              handleOnChanges({
                target: {
                  id: 'alignItems',
                  value: value,
                },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            value={state.editor.selectedElement.styles.alignItems}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
              <TabsTrigger
                value="center"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignVerticalJustifyCenter size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="normal"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignVerticalJustifyStart size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Display Flex */}
          <div className="flex items-center gap-2">
            <Input
              className="h-4 w-4"
              type="checkbox"
              id="display"
              checked={state.editor.selectedElement.styles.display === 'flex'}
              onChange={(e) => {
                handleOnChanges({
                  target: {
                    id: 'display',
                    value: e.target.checked ? 'flex' : 'block',
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }}
            />
            <Label className="text-muted-foreground">Flex</Label>
          </div>

          {/* Flex Direction */}
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Direction</Label>
            <Input
              placeholder="row, column, etc."
              id="flexDirection"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.flexDirection}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default SettingsTab
