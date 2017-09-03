// Name:
// Submenu:
// Author:
// Title:
// Version:
// Desc:
// Keywords:
// URL:
// Help:
#region UICode
IntSliderControl Amount1=0; //[0,100]Slider 1 Description
IntSliderControl Amount2=0; //[0,100]Slider 2 Description
IntSliderControl Amount3=0; //[0,100]Slider 3 Description
#endregion

void Render(Surface dst, Surface src, Rectangle rect)
{
    // Delete any of these lines you don't need
    Rectangle selection = EnvironmentParameters.GetSelection(src.Bounds).GetBoundsInt();
    int CenterX = ((selection.Right - selection.Left) / 2)+selection.Left;
    int CenterY = ((selection.Bottom - selection.Top) / 2)+selection.Top;
    ColorBgra PrimaryColor = (ColorBgra)EnvironmentParameters.PrimaryColor;
    ColorBgra SecondaryColor = (ColorBgra)EnvironmentParameters.SecondaryColor;
    int BrushWidth = (int)EnvironmentParameters.BrushWidth;

    ColorBgra CurrentPixel;
    for (int y = rect.Top; y < rect.Bottom; y++)
    {
        if (IsCancelRequested) return;
        for (int x = rect.Left; x < rect.Right; x++)
        {
            CurrentPixel = src[x,y];
            float amount = CurrentPixel.R / 256.0f;
            float inverse = 1 - amount;
            HsvColor aHsv = HsvColor.FromColor(PrimaryColor);
            HsvColor bHsv = HsvColor.FromColor(SecondaryColor);
            
            aHsv.Hue = (int)(aHsv.Hue * inverse + bHsv.Hue * amount);
            aHsv.Value = (int)(aHsv.Value * inverse + bHsv.Value * amount);
            aHsv.Saturation = (int)(aHsv.Saturation * inverse + bHsv.Saturation* amount);
            
            HsvColor hsv = aHsv;
                        
            ColorBgra col =ColorBgra.FromColor(aHsv.ToColor());
            dst[x,y] = col;
        }
    }
}
