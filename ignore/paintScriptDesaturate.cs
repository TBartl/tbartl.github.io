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
            // TODO: Add pixel processing code here
            // Access RGBA values this way, for example:
            float val = .7f;
            float inv = 1 - val;
            
            float gray =(CurrentPixel.R * .3f + CurrentPixel.G * .59f + CurrentPixel.B * .11f);
            CurrentPixel.R = (byte)(gray * val + CurrentPixel.R * inv);
            CurrentPixel.G = (byte)(gray * val + CurrentPixel.G * inv);
            CurrentPixel.B = (byte)(gray * val + CurrentPixel.B * inv);
            //CurrentPixel.A = PrimaryColor.A;
            dst[x,y] = CurrentPixel;
        }
    }
}
