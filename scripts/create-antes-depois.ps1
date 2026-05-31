# Combina capturas v1 (esquerda) e v2 (direita) com divisao diagonal no centro.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$leftPath = Join-Path $root 'legacy\v1\images\desktop.png'
$rightPath = Join-Path $root 'images\desktop.png'
$outPath = Join-Path $root 'images\antes-depois-diagonal.png'

$panelW = 1280
$height = 720
$diag = 42
$totalW = $panelW * 2
$bg = [System.Drawing.Color]::FromArgb(255, 15, 17, 20)

function Get-ScaledBitmap($path, $targetW, $targetH) {
    $src = [System.Drawing.Image]::FromFile($path)
    $bmp = New-Object System.Drawing.Bitmap $targetW, $targetH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear($bg)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $ratio = [Math]::Min($targetW / $src.Width, $targetH / $src.Height)
    $w = [int]($src.Width * $ratio)
    $h = [int]($src.Height * $ratio)
    $x = [int](($targetW - $w) / 2)
    $y = [int](($targetH - $h) / 2)
    $g.DrawImage($src, $x, $y, $w, $h)
    $g.Dispose()
    $src.Dispose()
    return $bmp
}

$left = Get-ScaledBitmap $leftPath $panelW $height
$right = Get-ScaledBitmap $rightPath $panelW $height

$canvas = New-Object System.Drawing.Bitmap $totalW, $height
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.Clear($bg)

# Metade esquerda (v1) — poligono com borda direita diagonal
$clipLeft = New-Object System.Drawing.Drawing2D.GraphicsPath
[void]$clipLeft.AddPolygon(@(
    ([System.Drawing.Point]::new(0, 0)),
    ([System.Drawing.Point]::new($panelW + $diag, 0)),
    ([System.Drawing.Point]::new($panelW - $diag, $height)),
    ([System.Drawing.Point]::new(0, $height))
))
$state = $graphics.Save()
$graphics.SetClip($clipLeft)
$graphics.DrawImage($left, 0, 0)
$graphics.Restore($state)

# Metade direita (v2)
$clipRight = New-Object System.Drawing.Drawing2D.GraphicsPath
[void]$clipRight.AddPolygon(@(
    ([System.Drawing.Point]::new($panelW - $diag, 0)),
    ([System.Drawing.Point]::new($totalW, 0)),
    ([System.Drawing.Point]::new($totalW, $height)),
    ([System.Drawing.Point]::new($panelW + $diag, $height))
))
$state = $graphics.Save()
$graphics.SetClip($clipRight)
$graphics.DrawImage($right, $panelW, 0)
$graphics.Restore($state)

# Linha diagonal de separacao
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(200, 255, 255, 255)), 2
$graphics.DrawLine($pen, $panelW + $diag, 0, $panelW - $diag, $height)
$pen.Dispose()

# Labels discretos
$font = [System.Drawing.Font]::new('Segoe UI', 28, [System.Drawing.FontStyle]::Bold)
$brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 244, 246, 248))
$shadow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(140, 0, 0, 0))
$graphics.DrawString('2022', $font, $shadow, 21, 21)
$graphics.DrawString('2022', $font, $brush, 20, 20)
$graphics.DrawString('2026', $font, $shadow, $panelW + 21, 21)
$graphics.DrawString('2026', $font, $brush, ($panelW + 20), 20)
$font.Dispose()
$brush.Dispose()
$shadow.Dispose()

$canvas.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$canvas.Dispose()
$left.Dispose()
$right.Dispose()

Write-Host "Imagem gerada: $outPath"
