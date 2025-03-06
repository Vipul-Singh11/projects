import streamlit as st
import pdfplumber
import pandas as pd
import plotly.express as px
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# --- PAGE CONFIGURATION ---
st.set_page_config(page_title="AI Resume Screening", page_icon="https://cdn-icons-png.freepik.com/512/1870/1870080.png", layout="wide")

# --- CUSTOM STYLING ---
st.markdown(
    """
    <style>
        .big-title { font-size: 32px; font-weight: bold; text-align: center; color: #4A90E2; }
        .small-text { font-size: 18px; text-align: center; color: #666; }
        .stTextArea textarea { font-size: 16px !important; }
    </style>
    """, unsafe_allow_html=True
)

# --- FUNCTION TO EXTRACT TEXT FROM PDF ---
def extract_text_from_pdf(file):
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text.strip() if text else "No readable text found."

# --- FUNCTION TO RANK RESUMES ---
def rank_resumes(job_description, resumes):
    documents = [job_description] + resumes
    vectorizer = TfidfVectorizer().fit_transform(documents)
    vectors = vectorizer.toarray()
    
    job_description_vector = vectors[0]
    resume_vectors = vectors[1:]
    cosine_similarities = cosine_similarity([job_description_vector], resume_vectors).flatten()
    
    return cosine_similarities

# --- SIDEBAR CONFIGURATION ---
st.sidebar.image("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80", width=100)
st.sidebar.title("Navigation")
st.sidebar.markdown("Use the options below to interact with the application.")

# --- MAIN TITLE ---
st.markdown('<p class="big-title">📄 AI Resume Screening & Ranking System</p>', unsafe_allow_html=True)
st.markdown('<p class="small-text">Upload resumes and rank them based on job description similarity</p>', unsafe_allow_html=True)
st.markdown("---")

# --- INPUT SECTION ---
job_description = st.text_area("📌 Enter the Job Description", placeholder="Paste job description here...")
uploaded_files = st.file_uploader("📂 Upload Resumes (PDF)", type=["pdf"], accept_multiple_files=True)

if uploaded_files and job_description:
    with st.spinner("Processing resumes... Please wait ⏳"):
        resumes = [extract_text_from_pdf(file) for file in uploaded_files]
        scores = rank_resumes(job_description, resumes)
    
    ranked_resumes = sorted(zip(uploaded_files, resumes, scores), key=lambda x: x[2], reverse=True)
    
    # --- DISPLAY RANKED RESUMES IN A TABLE ---
    st.subheader("🏆 Ranked Resumes")
    df = pd.DataFrame({"Candidate Name": [file.name for file, _, _ in ranked_resumes], "Score": [score for _, _, score in ranked_resumes]})
    st.dataframe(df.style.format({"Score": "{:.2f}"}))
    
    # --- SCORE VISUALIZATION ---
    st.subheader("📊 Score Distribution")
    fig = px.bar(df, x="Candidate Name", y="Score", text="Score", color="Score", color_continuous_scale="blues")
    st.plotly_chart(fig, use_container_width=True)
    
    # --- CANDIDATE PROFILE PREVIEW ---
    st.subheader("📝 Candidate Resume Preview")
    selected_candidate = st.selectbox("Select a candidate to view their resume content:", [file.name for file, _, _ in ranked_resumes])
    for file, text, _ in ranked_resumes:
        if file.name == selected_candidate:
            st.text_area("Extracted Resume Content:", text, height=300)
            break
    
    # --- DOWNLOADABLE REPORT ---
    st.subheader("📥 Download Ranked Results")
    csv = df.to_csv(index=False).encode('utf-8')
    st.download_button("Download CSV", csv, "ranked_resumes.csv", "text/csv")
    
    # --- AI-POWERED RESUME SUGGESTIONS ---
    st.subheader("🤖 AI Suggestions for Candidates")
    for file, text, score in ranked_resumes:
        st.markdown(f"**{file.name} - Score: {score:.2f}**")
        suggested_improvements = "Consider adding more relevant skills and experience based on job description keywords."
        st.info(suggested_improvements)
    
    # --- KEYWORD MATCHING & HIGHLIGHTING ---
    st.subheader("🔍 Job Description Keyword Matching")
    keywords = job_description.split()
    highlighted_resumes = [text for text in resumes if any(keyword.lower() in text.lower() for keyword in keywords)]
    if highlighted_resumes:
        st.write("These resumes contain key job description terms:")
        for text in highlighted_resumes[:3]:
            st.text_area("Matched Resume:", text[:500] + "...", height=200)
    else:
        st.write("No resumes strongly matched job description keywords.")
    
    # --- PDF RESUME PREVIEW ---
    st.subheader("📜 PDF Resume Preview")
    selected_pdf = st.selectbox("Select a PDF to preview:", [file.name for file in uploaded_files])
    for file in uploaded_files:
        if file.name == selected_pdf:
            st.download_button("Download PDF", file, file.name)
            break
    
    # --- LINKEDIN INTEGRATION (FUTURE FEATURE) ---
    st.subheader("🔗 LinkedIn Profile Analysis")
    st.write("Coming soon: Extract resume data from LinkedIn profiles!")
    
else:
    st.warning("⚠️ Please enter a job description and upload resumes to proceed.")
