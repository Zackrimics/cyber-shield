import { ToolDefinition } from '../types';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'phishing',
    title: 'Phishing & Scam Detection',
    description: 'Analyze text, emails, SMS, or URLs for phishing and fraud indicators.',
    icon: 'ShieldAlert',
    inputLabel: 'Message Content',
    inputPlaceholder: 'Paste the suspicious email, SMS, or URL here...',
    systemInstruction: `You are a cybersecurity expert specializing in phishing and fraud detection. 
Analyze the input and determine if it is fraudulent. Look for urgency, suspicious links, poor grammar, generic greetings, and "too good to be true" offers.`
  },
  {
    id: 'email-breach',
    title: 'Email Breach Checker',
    description: 'Check if an email is exposed in known data breaches (Simulated).',
    icon: 'MailWarning',
    inputLabel: 'Email Address',
    inputPlaceholder: 'Enter email address (e.g., user@example.com)...',
    systemInstruction: `You are a cybersecurity expert specializing in data breaches. 
Simulate a breach check for the provided email address. Explain the risks of email exposure, credential stuffing, and suggest password changes and 2FA.
CRITICAL: You MUST populate the 'findings' array with a simulated list of specific websites/services where this email was breached. Include the 'title' (e.g., "LinkedIn", "Adobe"), 'description' (e.g., "Breached in 2012. Exposed data: Email addresses, Passwords"), and a 'url' to read more about the breach if applicable.`
  },
  {
    id: 'username-osint',
    title: 'Username OSINT Search',
    description: 'Analyze username patterns and suggest possible exposure risks.',
    icon: 'UserSearch',
    inputLabel: 'Username',
    inputPlaceholder: 'Enter username to analyze...',
    systemInstruction: `You are an OSINT (Open Source Intelligence) expert. 
Analyze the provided username. Explain how usernames are reused across platforms, the risks of cross-platform tracking, and provide advice on maintaining privacy.
CRITICAL: You MUST populate the 'findings' array with a simulated list of social media platforms (e.g., LinkedIn, Instagram, Twitter, GitHub) where this username might exist. Include the 'title' (Platform name), 'description' (What kind of info might be exposed there), and a direct 'url' to the hypothetical profile (e.g., "https://instagram.com/[username]").`
  },
  {
    id: 'port-scanner',
    title: 'Port Scanner (Simulated)',
    description: 'Simulate a port scan on an IP or domain and explain the risks.',
    icon: 'Network',
    inputLabel: 'IP Address or Domain',
    inputPlaceholder: 'Enter IP or domain (e.g., 192.168.1.1 or example.com)...',
    systemInstruction: `You are a network security expert. 
Simulate a port scan for the provided IP/domain. Identify common open ports (e.g., 21, 22, 80, 443, 3389), explain what services run on them, and detail the security risks of leaving them exposed.`
  },
  {
    id: 'sql-injection',
    title: 'SQL Injection Scanner',
    description: 'Analyze input fields or URLs for SQL injection vulnerabilities.',
    icon: 'Database',
    inputLabel: 'Input Field or URL',
    inputPlaceholder: 'Enter URL with parameters or input string...',
    systemInstruction: `You are an application security expert. 
Analyze the input for potential SQL injection vulnerabilities. Explain how SQLi works, why the input might be risky, and recommend mitigation strategies like parameterized queries.`
  },
  {
    id: 'xss-scanner',
    title: 'XSS Vulnerability Scanner',
    description: 'Detect possible cross-site scripting (XSS) patterns in inputs.',
    icon: 'Code2',
    inputLabel: 'HTML or Script Input',
    inputPlaceholder: 'Enter potentially malicious script or HTML...',
    systemInstruction: `You are an application security expert. 
Analyze the input for Cross-Site Scripting (XSS) vulnerabilities. Look for unescaped script tags, event handlers, or javascript URIs. Explain the impact of XSS and how to prevent it.`
  },
  {
    id: 'malware-hash',
    title: 'Malware File Hash Analyzer',
    description: 'Determine if a file hash is potentially malicious.',
    icon: 'FileWarning',
    inputLabel: 'File Hash (MD5, SHA1, SHA256)',
    inputPlaceholder: 'Enter file hash...',
    systemInstruction: `You are a malware analyst. 
Analyze the provided file hash. Explain what file hashes are, how they are used to identify malware, and simulate an analysis indicating if it resembles known malware patterns.`
  },
  {
    id: 'brute-force',
    title: 'Brute Force Simulator',
    description: 'Demonstrate how weak passwords can be cracked and estimate time.',
    icon: 'KeyRound',
    inputLabel: 'Password to Test',
    inputPlaceholder: 'Enter a password to simulate cracking time...',
    systemInstruction: `You are a password security expert. 
Analyze the provided password for strength against brute-force and dictionary attacks. Estimate the time to crack it using modern hardware. Explain password entropy and recommend improvements.`
  },
  {
    id: 'hash-identifier',
    title: 'Hash Type Identifier',
    description: 'Detect hash type (MD5, SHA1, etc.) and explain usage risks.',
    icon: 'Hash',
    inputLabel: 'Hash String',
    inputPlaceholder: 'Enter hash string...',
    systemInstruction: `You are a cryptography expert. 
Analyze the provided hash string. Identify its likely algorithm (e.g., MD5, SHA-1, SHA-256, bcrypt) based on length and character set. Explain the security properties of the algorithm and if it is considered deprecated or secure.`
  },
  {
    id: 'mitm-detection',
    title: 'MITM Detection',
    description: 'Analyze network scenarios for Man-in-the-Middle interception risks.',
    icon: 'Wifi',
    inputLabel: 'Network Scenario',
    inputPlaceholder: 'Describe the network situation (e.g., "Connecting to public airport Wi-Fi to check bank account")...',
    systemInstruction: `You are a network security expert. 
Analyze the described network scenario for Man-in-the-Middle (MITM) risks. Explain how an attacker might intercept traffic, the dangers involved, and recommend protections like VPNs and HTTPS.`
  }
];
