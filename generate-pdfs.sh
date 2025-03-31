#!/bin/bash

# Create sample PDFs for the resources
cd public/files

# Texas Legislative Calendar 2025
convert -size 612x792 -background white -fill black -gravity center \
    -pointsize 24 label:"Texas Legislative Calendar 2025\n\nComprehensive guide to the 89th Texas Legislative Session with important deadlines,\ncommittee meeting schedules, and key dates." \
    texas-legislative-calendar-2025.pdf

# Texas Transportation Funding Outlook
convert -size 612x792 -background white -fill black -gravity center \
    -pointsize 24 label:"Texas Transportation Funding Outlook\n\nAnalysis of transportation funding trends, legislative priorities,\nand future funding projections for Texas infrastructure." \
    texas-transportation-funding-outlook.pdf

# Telecommunications Regulatory Outlook
convert -size 612x792 -background white -fill black -gravity center \
    -pointsize 24 label:"Telecommunications Regulatory Outlook\n\nOverview of upcoming regulatory changes, legislative priorities,\nand industry trends affecting telecommunications in Texas." \
    telecommunications-regulatory-outlook.pdf

# Healthcare Regulatory Changes Impact Analysis
convert -size 612x792 -background white -fill black -gravity center \
    -pointsize 24 label:"Healthcare Regulatory Changes Impact Analysis\n\nAnalysis of recent and upcoming healthcare regulatory changes\nand their potential impact on providers and patients in Texas." \
    healthcare-regulatory-changes.pdf

# Municipal Advocacy Strategies
convert -size 612x792 -background white -fill black -gravity center \
    -pointsize 24 label:"Municipal Advocacy Strategies\n\nEffective advocacy strategies for cities and local governments\nto advance their legislative priorities in the Texas Legislature." \
    municipal-advocacy-strategies.pdf

# Water Infrastructure Funding Guide
convert -size 612x792 -background white -fill black -gravity center \
    -pointsize 24 label:"Water Infrastructure Funding Guide\n\nComprehensive guide to funding opportunities for water infrastructure projects\nin Texas, including state and federal programs." \
    water-infrastructure-funding.pdf

# Energy Grid Reliability Assessment
convert -size 612x792 -background white -fill black -gravity center \
    -pointsize 24 label:"Energy Grid Reliability Assessment\n\nAnalysis of Texas energy grid reliability, regulatory framework,\nand policy recommendations for improving resilience." \
    energy-grid-reliability.pdf

echo "All sample PDFs created successfully."
