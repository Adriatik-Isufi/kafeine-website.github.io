import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Coffee } from "lucide-react"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-secondary/10">
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
                    Kërkojmë barista me përvojë për të krijuar kafe të shkëlqyer dhe për të ofruar shërbim të
                    jashtëzakonshëm për klientët.
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
                  Shërbyes/e
                </CardTitle>
                <CardDescription>Kohë e pjesshme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Prishtinë, Kosovë
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    4-6 orë në ditë
                  </div>
                  <p className="text-sm">
                    Kërkojmë shërbyes/e të sjellshëm për të ofruar përvojë të shkëlqyer për klientët tanë dhe për të
                    mbajtur ambientin e pastër.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Fleksibilitet</Badge>
                    <Badge variant="secondary">Shërbim klienti</Badge>
                    <Badge variant="secondary">Organizim</Badge>
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
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Emri</label>
                      <Input placeholder="Emri juaj" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Mbiemri</label>
                      <Input placeholder="Mbiemri juaj" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Telefoni</label>
                    <Input placeholder="+383 XX XXX XXX" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Pozicioni i dëshiruar</label>
                    <select className="w-full p-3 border border-input rounded-md bg-background">
                      <option>Barista</option>
                      <option>Shërbyes/e</option>
                      <option>Tjetër</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Përvojë e mëparshme</label>
                    <Textarea
                      placeholder="Tregoni për përvojën tuaj të mëparshme në industrinë e ushqimit dhe pijeve..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Pse dëshironi të punoni me ne?</label>
                    <Textarea placeholder="Tregoni pse jeni i/e interesuar për të punuar në Kafeinë..." rows={4} />
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">Dërgo Aplikimin</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
