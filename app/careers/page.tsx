"use client"

import { useState, useEffect, useRef } from "react"
import emailjs from "@emailjs/browser"
// TypeScript declarations for Uploadcare
declare global {
  interface Window {
    uploadcare: any
  }
}

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Coffee, Upload, FileText, X } from "lucide-react"

export default function CareersPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    motivation: "",
  })
  const [cvFiles, setCvFiles] = useState<{ url: string; name: string }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const widgetInitialized = useRef(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (widgetInitialized.current && (widgetInitialized.current === true || widgetInitialized.current.initialized)) return
    
    // Load the basic Uploadcare widget
    const script = document.createElement('script')
    script.src = 'https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js'
    script.charset = 'utf-8'
    document.head.appendChild(script)
    
    // Add custom CSS to style the widget
    const style = document.createElement('style')
    style.textContent = `
      /* Hide ALL secondary buttons (Cancel, Remove) */
      .uploadcare--widget__button_type_cancel,
      .uploadcare--widget__button_type_remove,
      .uploadcare--widget__buttons button:not(.uploadcare--widget__button_type_open),
      .uploadcare--widget button[type="button"]:not(.uploadcare--widget__button_type_open) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
      }
      
      /* Hide all widgets except the first */
      .uploadcare--widget {
        display: none !important;
      }
      
      /* Show and style only the first widget and main upload button */
      .uploadcare--widget:first-of-type {
        display: block !important;
        width: 100% !important;
        margin: 0 !important;
      }
      
      /* Style the main upload button */
      .uploadcare--widget__button_type_open,
      .uploadcare--widget__button:first-child {
        display: flex !important;
        background: rgba(228, 191, 143, 0.5) !important;
        color: #8B4513 !important;
        border: none !important;
        border-radius: 12px !important;
        padding: 32px 24px !important;
        font-family: inherit !important;
        font-size: 15px !important;
        font-weight: 600 !important;
        width: 100% !important;
        min-height: 120px !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 4px 15px rgba(228, 191, 143, 0.25) !important;
        text-decoration: none !important;
        position: relative !important;
        text-shadow: none !important;
      }
      
      
      .uploadcare--widget__button_type_open:hover,
      .uploadcare--widget__button:first-child:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(228, 191, 143, 0.35) !important;
        background: rgba(228, 191, 143, 0.7) !important;
      }
      
      /* Add icon before text */
      .uploadcare--widget__button_type_open:before,
      .uploadcare--widget__button:first-child:before {
        content: "📄" !important;
        font-size: 28px !important;
        margin-right: 12px !important;
      }
      
      /* Hide ALL default text completely */
      .uploadcare--widget__text,
      .uploadcare--widget__button_type_open .uploadcare--widget__text,
      .uploadcare--widget__button:first-child .uploadcare--widget__text,
      .uploadcare--widget__button_type_open span,
      .uploadcare--widget__button:first-child span,
      .uploadcare--widget__button_type_open *,
      .uploadcare--widget__button:first-child * {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        font-size: 0 !important;
        line-height: 0 !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
        position: absolute !important;
        left: -9999px !important;
      }
      
      .uploadcare--widget__button_type_open:after,
      .uploadcare--widget__button:first-child:after {
        content: "Kliko për të ngarkuar dokumentin" !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 15px !important;
        color: #8B4513 !important;
        font-weight: 600 !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: 100% !important;
        visibility: visible !important;
        opacity: 1 !important;
        text-align: center !important;
      }
      
      /* Progress bar styling */
      .uploadcare--widget__progress {
        margin: 12px 0 !important;
        border-radius: 8px !important;
        background: rgba(255, 255, 255, 0.2) !important;
      }
      
      .uploadcare--widget__progress-bar {
        background: white !important;
        border-radius: 8px !important;
      }
      
      /* Extra insurance: hide any button that's not the main one */
      .uploadcare--widget div:not(:first-child) > button {
        display: none !important;
      }
      
      /* Override any default Uploadcare button text */
      .uploadcare--widget__button_type_open,
      .uploadcare--widget__button:first-child {
        text-indent: 0 !important;
        color: transparent !important;
      }
      
      /* Style the Uploadcare modal to match theme */
      .uploadcare--dialog .uploadcare--dialog__container {
        background: #faf7f2 !important;
        border-radius: 12px !important;
      }
      
      .uploadcare--dialog .uploadcare--tab__title {
        color: #8B4513 !important;
      }
      
      .uploadcare--dialog .uploadcare--button_primary {
        background: rgba(228, 191, 143, 0.8) !important;
        color: #8B4513 !important;
        border: none !important;
        border-radius: 8px !important;
      }
      
      .uploadcare--dialog .uploadcare--button_primary:hover {
        background: rgba(228, 191, 143, 1) !important;
      }
    `
    document.head.appendChild(style)
    
    // Initialize widget after script loads
    script.onload = () => {
      if (window.uploadcare) {
        const initializeWidget = () => {
          // Remove any extra widget elements
          const allButtons = document.querySelectorAll('.uploadcare--widget__button')
          allButtons.forEach((button, index) => {
            if (index > 0 && !button.classList.contains('uploadcare--widget__button_type_open')) {
              button.style.display = 'none'
              button.remove()
            }
          })
          
          const uploadInput = document.querySelector('[role=uploadcare-uploader]')
          if (uploadInput) {
            const widget = window.uploadcare.SingleWidget(uploadInput)
            if (widget) {
              widget.onUploadComplete((fileInfo) => {
                if (fileInfo) {
                  const newFile = {
                    url: fileInfo.cdnUrl,
                    name: fileInfo.name || fileInfo.originalFilename || `Document-${Date.now()}`
                  }
                  setCvFiles(prev => {
                    const existing = prev.find(f => f.url === newFile.url)
                    if (!existing) {
                      return [...prev, newFile]
                    }
                    return prev
                  })
                }
              })
            }
          }
        }
        
        // Initialize immediately and set up observer for dynamic elements
        setTimeout(initializeWidget, 500)
        
        // Re-initialize when upload input changes
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const uploadInput = node.querySelector?.('[role=uploadcare-uploader]') || 
                                 (node.matches?.('[role=uploadcare-uploader]') ? node : null)
                if (uploadInput) {
                  setTimeout(initializeWidget, 100)
                }
              }
            })
          })
        })
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        })
        
        // Store observer reference for cleanup
        widgetInitialized.current = { initialized: true, observer }
      } else {
        widgetInitialized.current = true
      }
    }
    
    return () => {
      if (script.parentNode) {
        document.head.removeChild(script)
      }
      if (style.parentNode) {
        document.head.removeChild(style)
      }
      // Clean up the mutation observer
      if (widgetInitialized.current && typeof widgetInitialized.current === 'object' && widgetInitialized.current.observer) {
        widgetInitialized.current.observer.disconnect()
      }
    }
  }, [])

  const removeCvFile = (urlToRemove: string) => {
    setCvFiles(prev => prev.filter(file => file.url !== urlToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Format CV links for email
    const cvLinks = cvFiles.length > 0 
      ? cvFiles.map((file, index) => `${index + 1}. ${file.name}: ${file.url}`).join('\n')
      : "Nuk është ngarkuar CV"

    try {
      // EmailJS configuration
      await emailjs.send(
        "service_2sbw13k", // Service ID
        "template_0p3lfba", // Template ID - Updated for careers
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone,
          position: formData.position,
          experience: formData.experience,
          motivation: formData.motivation,
          cv_link: cvLinks,
          to_name: "Kafeinë",
        },
        "KKENUxLOnvZvdWiu2", // Public Key
      )

      setSubmitStatus("success")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        motivation: "",
      })
      setCvFiles([])
    } catch (error) {
      console.error("Email send failed:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isCareerPage={true} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Puno me Ne</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Bashkohu me ekipin tonë dhe bëhu pjesë e familjes Kafeinë. Kërkojmë persona të pasionuar që duan të
              krijojnë përvojë të veçanta për klientët tanë.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pozicionet e Hapura</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-primary" />
                  Barista
                </CardTitle>
                <CardDescription>Kohë e plotë</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Prishtinë, Kosovë
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />8 orë në ditë
                  </div>
                  <p className="text-sm">
                    Kërkojmë barista me përvojë dhe pasion për kafenë, që të krijojnë pije të shkëlqyera – nga espresso klasike
                    deri te specialitetet moderne – dhe të ofrojnë një shërbim mikpritës për çdo klient.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Përvojë</Badge>
                    <Badge variant="secondary">Komunikim</Badge>
                    <Badge variant="secondary">Punë në ekip</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Arkatare
                </CardTitle>
                <CardDescription>Kohë e plotë</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Prishtinë, Kosovë
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    8 orë në ditë
                  </div>
                  <p className="text-sm">
                    Kërkojmë arkatare të sjellshme dhe të besueshme, e cila do të kujdeset për pagesat, organizimin e arkës dhe mirëseardhjen e 
                    klientëve, duke siguruar një përvojë të këndshme dhe të shpejtë.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Fleksibilitet</Badge>
                    <Badge variant="secondary">Shërbim klienti</Badge>
                    <Badge variant="secondary">Organizim</Badge>
                    <Badge variant="secondary">Besueshmëri</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Apliko Tani</h2>
            <Card>
              <CardContent className="p-6">
                {submitStatus === "success" ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white">✓</span>
                      </div>
                    </div>
                    <p className="text-green-600 text-lg mb-2">Aplikimi u dërgua me sukses!</p>
                    <p className="text-muted-foreground">Do të kontaktoheni së shpejti nga ekipi ynë.</p>
                    <Button
                      onClick={() => setSubmitStatus("idle")}
                      className="mt-6 bg-primary hover:bg-primary/90"
                    >
                      Apliko Përsëri
                    </Button>
                  </div>
                ) : submitStatus === "error" ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white">✗</span>
                      </div>
                    </div>
                    <p className="text-red-600 text-lg mb-2">Gabim në dërgim!</p>
                    <p className="text-muted-foreground">Ju lutem provoni përsëri ose na kontaktoni drejtpërdrejt.</p>
                    <Button
                      onClick={() => setSubmitStatus("idle")}
                      className="mt-6 bg-primary hover:bg-primary/90"
                    >
                      Provo Përsëri
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Emri</label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Emri juaj"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Mbiemri</label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Mbiemri juaj"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Telefoni</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+383 XX XXX XXX"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Pozicioni i dëshiruar</label>
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full p-3 border border-input rounded-md bg-background disabled:opacity-50"
                      >
                        <option value="">Zgjidhni pozicionin</option>
                        <option value="Barista">Barista</option>
                        <option value="Arkatare">Arkatare</option>
                        <option value="Tjetër">Tjetër</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Përvojë e mëparshme</label>
                      <Textarea
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="Tregoni për përvojën tuaj të mëparshme në industrinë e ushqimit dhe pijeve..."
                        rows={4}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Pse dëshironi të punoni me ne?</label>
                      <Textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        placeholder="Tregoni pse jeni i/e interesuar për të punuar në Kafeinë..."
                        rows={4}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* CV Upload Section */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Dokumente <span className="text-muted-foreground text-xs">(Opsionale)</span>
                      </label>
                      
                      {/* Uploaded files list */}
                      {cvFiles.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-4">
                          {cvFiles.map((file, index) => (
                            <div key={file.url} className="relative group">
                              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="flex flex-col items-center text-center max-w-[120px]">
                                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                    <FileText className="w-6 h-6 text-green-600" />
                                  </div>
                                  <span className="text-xs font-medium text-gray-700 truncate w-full" title={file.name}>
                                    {file.name}
                                  </span>
                                </div>
                              </div>
                              {/* Remove button - small X above the file */}
                              <button
                                type="button"
                                onClick={() => removeCvFile(file.url)}
                                disabled={isSubmitting}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Single upload widget - always present but conditionally visible */}
                      <div className={`flex justify-center ${cvFiles.length >= 3 ? 'hidden' : ''}`}>
                        <input
                          key="uploadcare-widget"
                          type="hidden"
                          role="uploadcare-uploader"
                          data-public-key="aa62ce8437d57021349a"
                          data-tabs="file camera url gdrive dropbox onedrive"
                          data-multiple="false"
                          data-images-only="false"
                          data-preview-step="false"
                          data-system-dialog="false"
                        />
                      </div>
                      
                      {/* Status messages */}
                      <div className="text-center mt-3">
                        {cvFiles.length === 0 ? (
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-medium">
                              Klikoni butonin për të ngarkuar dokumentin
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Formate të pranuara: PDF, DOC, DOCX • Maksimumi: 5MB
                            </p>
                          </div>
                        ) : cvFiles.length < 3 ? (
                          <div className="space-y-1">
                            <p className="text-xs text-green-600 font-medium">
                              ✓ {cvFiles.length} dokument{cvFiles.length > 1 ? 'e' : ''} u ngarkua me sukses
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Mund të ngarkoni edhe {3 - cvFiles.length} dokument{3 - cvFiles.length > 1 ? 'e' : ''} të tjer{3 - cvFiles.length > 1 ? 'a' : ''}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-amber-600 font-medium">
                            ⚠️ Keni arritur limitin maksimal të dokumenteve (3)
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Po dërgohet..." : "Dërgo Aplikimin"}
                      {cvFiles.length > 0 && (
                        <div className="ml-2 flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span className="text-xs">({cvFiles.length})</span>
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}