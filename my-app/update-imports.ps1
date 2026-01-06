# Script to update all slide imports to new paths
# This PowerShell script will update all the slide files with correct imports

$files = @(
    "WinSlide.tsx",
    "LossSlide.tsx",
    "DrawSlide.tsx",
    "MatedBySlide.tsx",
    "StreakSlide.tsx",
    "GameLengthSlide.tsx",
    "WorstOpeningSlide.tsx",
    "EndSlide.tsx",
    "ImpressiveMatchesSlide.tsx"
)

$basePath = "e:\Smolfish\Chess-Wrapped\my-app\src\components\features\wrapped\stories"

foreach ($file in $files) {
    $filePath = Join-Path $basePath $file
    $content = Get-Content $filePath -Raw
    
    # Replace StoryCard import
    $content = $content -replace "import StoryCard from '@/components/ui/StoryCard';", "import StoryCard from '@/components/ui/Card/StoryCard';"
    
    # Replace shared imports
    $content = $content -replace "import \{ (.*?) \} from '\./shared';", "import { StoryBackground } from '@/components/shared/layouts/StoryLayout';`nimport { containerVariants, itemVariants } from '@/components/shared/animations';`nimport { CONTAINERS, TYPOGRAPHY } from '@/components/shared/styles';"
    
    Set-Content $filePath $content -NoNewline
    Write-Host "Updated: $file"
}

Write-Host "All files updated successfully!"
