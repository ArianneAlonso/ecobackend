import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface QRGeneratorProps {
  value: string;
  title: string;
  description?: string;
  points?: number;
}

export default function QRGenerator({ value, title, description, points }: QRGeneratorProps) {
  const handleDownload = () => {
    console.log('Download QR code:', value);
  };

  const handleShare = () => {
    console.log('Share QR code:', value);
  };

  return (
    <Card data-testid="card-qr-generator">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-white p-6 rounded-lg">
          <QRCodeSVG value={value} size={200} level="H" />
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground text-center">{description}</p>
        )}
        
        {points !== undefined && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Puntos requeridos</p>
            <p className="text-2xl font-bold text-primary">{points}</p>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload} data-testid="button-download-qr">
            <Download className="h-4 w-4 mr-2" />
            Descargar
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare} data-testid="button-share-qr">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
