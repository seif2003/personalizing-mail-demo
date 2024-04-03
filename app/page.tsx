"use client"
import MailTemplate from "@/components/MailTemplate";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import axios from "axios";
import ReactDOMServer from 'react-dom/server';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function Home() {
  const [fontSize, setFontSize] = useState(14);
  const [textColor, setTextColor] = useState("black");

  const form = useForm({
    defaultValues: {
      price: 14,
    },
  });

  const watchedPrice = form.watch("price");

  useEffect(() => {
    setFontSize(watchedPrice);
  }, [watchedPrice]);

  function saveTemplate() {
    const body = ReactDOMServer.renderToString(<MailTemplate fontSize={fontSize} textColor={textColor}/>);
    axios.post("http://127.0.0.1:8000/save-template/", {body, subject: "Mail Template"})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    alert("Form Submitted");
    saveTemplate()
  }

  return (
    <main className="flex items-center justify-center h-[100vh] flex-col bg-[#27272a]">
      <Form {...form}>
        <form
        onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="bg-zinc-500 rounded-xl w-[70vw] flex flex-row">
              <div className="bg-white w-[50vw] h-[50vh] flex items-center justify-center rounded-xl">
              <MailTemplate fontSize={fontSize} textColor={textColor}/>
              </div>
              <div className="w-[20vw] p-8">
              <FormField
              control={form.control}
              name="price"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                <FormLabel>Font Size - {value}</FormLabel>
                <FormControl>
                  <Slider
                  min={0}
                  max={100}
                  step={1}
                  defaultValue={[value]}
                  onValueChange={onChange}
                  />
                </FormControl>
                <FormMessage />
                </FormItem>
              )}
              />
              <div className="flex flex-col mt-6">
                <FormLabel>Text Color</FormLabel>
                <div className="mt-3 flex flex-row gap-3">
                <div 
                  className={`rounded-full w-[30px] h-[30px] bg-black ${textColor === 'black'&& "border-[2px] border-white"}`}
                  onClick={() => setTextColor("black")}
                >
                </div>
                <div 
                  className={`rounded-full w-[30px] h-[30px] bg-[#e11d48] ${textColor === '#e11d48'&& "border-[2px] border-white"}`}
                  onClick={() => setTextColor("#e11d48")}
                >
                </div>
                </div>
              </div>
            </div>
            </div>
            <Button className="mt-20" type="submit">Save Template</Button>
          </form>
          </Form>
        </main>
        );
  
}
