import React from 'react';
import ThemeToggle, { ThemeToggleDropdown, LightDarkToggle } from '@/components/theme/ThemeToggle';
import MarketingLayout from '@/components/layouts/MarketingLayout';
import Card from '@/components/ui/Card';
import { Section } from '@/components/ui/Container';
import Typography, { Heading, Text } from '@/components/ui/Typography';

/**
 * ThemeDemo page
 * A demonstration of the theming system components and available themes
 */
export default function ThemeDemo() {
  return (
    <MarketingLayout>
      <Section>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Theme System Demo</h1>
          <p className="text-lg text-muted-foreground">
            Showcase of the flexible theming system and available color schemes
          </p>
        </header>
        
        <Card className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Theme Selectors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Simple Toggle</h3>
              <div className="flex items-center justify-center bg-card rounded-lg p-4 border border-border">
                <LightDarkToggle />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Theme Toggle</h3>
              <div className="flex items-center justify-center bg-card rounded-lg p-4 border border-border">
                <ThemeToggle />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Dropdown Selector</h3>
              <div className="flex items-center justify-center bg-card rounded-lg p-4 border border-border">
                <ThemeToggleDropdown />
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Color Palette</h2>
          <p className="mb-6">
            The current theme palette with CSS variable references
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ColorSwatch color="bg-background" name="Background" large />
            <ColorSwatch color="bg-foreground" name="Foreground" large />
            <ColorSwatch color="bg-card" name="Card" large />
            <ColorSwatch color="bg-card-foreground" name="Card Foreground" large />
            <ColorSwatch color="bg-primary" name="Primary" large />
            <ColorSwatch color="bg-primary-foreground" name="Primary Foreground" large />
            <ColorSwatch color="bg-secondary" name="Secondary" large />
            <ColorSwatch color="bg-secondary-foreground" name="Secondary Foreground" large />
            <ColorSwatch color="bg-muted" name="Muted" large />
            <ColorSwatch color="bg-muted-foreground" name="Muted Foreground" large />
            <ColorSwatch color="bg-accent" name="Accent" large />
            <ColorSwatch color="bg-accent-foreground" name="Accent Foreground" large />
            <ColorSwatch color="bg-destructive" name="Destructive" large />
            <ColorSwatch color="bg-destructive-foreground" name="Destructive Foreground" large />
            <ColorSwatch color="bg-border" name="Border" large />
            <ColorSwatch color="bg-input" name="Input" large />
            <ColorSwatch color="bg-ring" name="Ring" large />
          </div>
        </Card>
        
        <Card className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Typography</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">Using Traditional Elements</h3>
              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold">Heading 1</h1>
                  <p className="text-sm text-muted-foreground">text-4xl font-bold</p>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold">Heading 2</h2>
                  <p className="text-sm text-muted-foreground">text-3xl font-bold</p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold">Heading 3</h3>
                  <p className="text-sm text-muted-foreground">text-2xl font-bold</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold">Heading 4</h4>
                  <p className="text-sm text-muted-foreground">text-xl font-bold</p>
                </div>
                
                <div>
                  <h5 className="text-lg font-bold">Heading 5</h5>
                  <p className="text-sm text-muted-foreground">text-lg font-bold</p>
                </div>
                
                <div>
                  <h6 className="text-base font-bold">Heading 6</h6>
                  <p className="text-sm text-muted-foreground">text-base font-bold</p>
                </div>
                
                <div>
                  <p className="text-base">Regular paragraph text</p>
                  <p className="text-sm text-muted-foreground">text-base</p>
                </div>
                
                <div>
                  <p className="text-sm">Small text for less emphasis</p>
                  <p className="text-sm text-muted-foreground">text-sm</p>
                </div>
                
                <div>
                  <p className="text-xs">Extra small text for auxiliary information</p>
                  <p className="text-sm text-muted-foreground">text-xs</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">Using Typography Components</h3>
              <div className="space-y-4">
                <div>
                  <Typography variant="h1">Heading 1 Component</Typography>
                  <Typography variant="hint">Using Typography variant=&quot;h1&quot;</Typography>
                </div>
                
                <div>
                  <Heading level={2}>Heading 2 Component</Heading>
                  <Typography variant="hint">Using Heading level={2}</Typography>
                </div>
                
                <div>
                  <Typography variant="h3">Heading 3 Component</Typography>
                  <Typography variant="hint">Using Typography variant=&quot;h3&quot;</Typography>
                </div>
                
                <div>
                  <Typography variant="h4">Heading 4 Component</Typography>
                  <Typography variant="hint">Using Typography variant=&quot;h4&quot;</Typography>
                </div>
                
                <div>
                  <Typography variant="h5">Heading 5 Component</Typography>
                  <Typography variant="hint">Using Typography variant=&quot;h5&quot;</Typography>
                </div>
                
                <div>
                  <Typography variant="h6">Heading 6 Component</Typography>
                  <Typography variant="hint">Using Typography variant=&quot;h6&quot;</Typography>
                </div>
                
                <div>
                  <Text>Regular paragraph text component</Text>
                  <Typography variant="hint">Using Text component (default)</Typography>
                </div>
                
                <div>
                  <Text size="small">Small text component</Text>
                  <Typography variant="hint">Using Text size=&quot;small&quot;</Typography>
                </div>
                
                <div>
                  <Text size="large">Large text component</Text>
                  <Typography variant="hint">Using Text size=&quot;large&quot;</Typography>
                </div>
                
                <div>
                  <Typography variant="label">Label text component</Typography>
                  <Typography variant="hint">Using Typography variant=&quot;label&quot;</Typography>
                </div>
                
                <div>
                  <Typography variant="button">Button text component</Typography>
                  <Typography variant="hint">Using Typography variant=&quot;button&quot;</Typography>
                </div>
                
                <div>
                  <Typography variant="code">Code text component</Typography>
                  <Typography variant="hint">Using Typography variant=&quot;code&quot;</Typography>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Section>
    </MarketingLayout>
  );
}

function ColorSwatch({ 
  color, 
  name, 
  large = false 
}: { 
  color: string; 
  name: string;
  large?: boolean;
}) {
  return (
    <div className={`${large ? 'col-span-1' : ''}`}>
      <div className={`${color} h-14 rounded-md shadow-sm border border-border mb-1`} />
      <p className="font-medium text-sm">{name}</p>
      <p className="text-xs text-muted-foreground">{color}</p>
    </div>
  );
} 