# OULAD Dataset Information

## Tentang OULAD

Open University Learning Analytics Dataset (OULAD) adalah dataset publik yang berisi data dari Virtual Learning Environment (VLE) Open University. Dataset ini mencakup informasi tentang:

- **32,593 students**
- **22 courses (modules)**
- **7 courses presentations**
- Demographic information
- Assessment results
- VLE interaction logs

## Features yang Digunakan dalam Predictive Models

### 1. Student Performance Prediction
- **VLE Clicks**: Total interaksi student dengan learning materials
- **Assessment Scores**: Nilai dari continuous assessments
- **Submission Time**: Pola waktu pengumpulan tugas
- **Demographics**: Age, region, education level
- **Previous Course History**: Riwayat course sebelumnya

### 2. Student Withdrawal Prediction
- **VLE Activity Decline**: Penurunan aktivitas dari waktu ke waktu
- **Assessment Submission Rate**: Persentase tugas yang dikumpulkan
- **Forum Participation**: Tingkat partisipasi di forum diskusi
- **Login Frequency**: Frekuensi login ke VLE
- **Early Assessment Scores**: Nilai assessment di awal course

### 3. Assessment Score Prediction
- **Cumulative Assessment Score**: Total nilai assessments
- **VLE Engagement Level**: Level engagement dengan materials
- **Resource Access Pattern**: Pola akses ke learning resources
- **Time Spent on Materials**: Waktu yang dihabiskan di materials
- **Peer Interaction**: Interaksi dengan student lain

## Dataset Tables

OULAD terdiri dari 7 tables:

1. **studentInfo**: Demographic dan registration info
2. **courses**: Course/module information
3. **assessments**: Assessment information
4. **vle**: Virtual Learning Environment materials info
5. **studentVle**: Student interactions dengan VLE
6. **studentAssessment**: Student assessment results
7. **studentRegistration**: Course registration dates

## Referensi

- Paper: Kuzilek J., Hlosta M., Zdrahal Z. (2017) Open University Learning Analytics dataset
- [OULAD Official Website](https://analyse.kmi.open.ac.uk/open_dataset)
- License: CC BY 4.0

## Backend API Requirements

Backend harus menyediakan endpoints yang mengembalikan data yang sudah diproses dari OULAD:

```
GET /api/kpi/dashboard
- Mengembalikan aggregated metrics dari student performance

GET /api/models/dashboard
- Mengembalikan hasil prediksi dari trained models

GET /api/models/:id/predictions
- Mengembalikan detailed predictions untuk specific model
```

Data di frontend saat ini menggunakan mock data yang mencerminkan struktur dan pola OULAD dataset.
