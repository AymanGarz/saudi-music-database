// Sample data for Saudi Music Community Database
// In production, this would be replaced with API calls

const SAMPLE_ARTISTS = [
    ["أحمد الدوجان", "مطرب", "طرب أصيل", "https://instagram.com/ahmad_dojan", "الرياض", "تعاون مفتوح", "https://soundcloud.com/ahmad", "ahmad@example.com"],
    ["فاطمة الخالد", "ملحنة", "موسيقى معاصرة", "https://twitter.com/fatima_music", "جدة", "بحث عن مطربين", "https://youtube.com/fatima", "fatima.music@gmail.com"],
    ["محمد العتيبي", "عازف عود", "تراث سعودي", "https://instagram.com/oud_master", "الدمام", "ورش تدريب", "https://spotify.com/mohammed", "mohammed.oud@hotmail.com"],
    ["نورا السليم", "كاتبة أغاني", "بوب عربي", "https://tiktok.com/@nora_lyrics", "المدينة", "كتابة كلمات", "https://genius.com/nora", "nora.lyrics@outlook.com"],
    ["خالد الشمري", "منتج موسيقي", "هيب هوب عربي", "https://instagram.com/khalid_beats", "الرياض", "إنتاج ألبومات", "https://beatport.com/khalid", "khalid.producer@gmail.com"],
    ["آية المطيري", "مطربة", "R&B عربي", "https://instagram.com/aya_voice", "الخبر", "دويتو وتعاون", "https://soundcloud.com/aya", "aya.singer@gmail.com"],
    ["عبدالله الغامدي", "عازف جيتار", "روك عربي", "https://youtube.com/abdullah_guitar", "الطائف", "تكوين فرقة", "https://reverbnation.com/abdullah", "abdullah.guitar@yahoo.com"],
    ["ريم النعيمي", "مهندسة صوت", "جميع الأنواع", "https://linkedin.com/in/reem-audio", "جدة", "تسجيل وإنتاج", "https://portfolio.reem.com", "reem.audio@gmail.com"],
    ["سلطان الدوسري", "مؤلف موسيقي", "موسيقى تصويرية", "https://instagram.com/sultan_composer", "الرياض", "أفلام ومسلسلات", "https://imdb.com/sultan", "sultan.composer@gmail.com"],
    ["مريم الزهراني", "مطربة أوبرا", "كلاسيكي عربي", "https://facebook.com/mariam.opera", "مكة", "حفلات كلاسيكية", "https://operahouse.com/mariam", "mariam.opera@hotmail.com"],
    ["يوسف الحربي", "DJ", "إلكترونيك عربي", "https://instagram.com/dj_youssef", "الدمام", "حفلات ومهرجانات", "https://mixcloud.com/youssef", "dj.youssef@gmail.com"],
    ["هند الفايز", "معلمة موسيقى", "تعليمي", "https://youtube.com/hind_music_teacher", "بريدة", "دروس خصوصية", "https://teachable.com/hind", "hind.teacher@edu.sa"],
    ["راشد القحطاني", "مطرب شعبي", "تراث نجدي", "https://instagram.com/rashed_folklore", "الرياض", "مناسبات تراثية", "https://anghami.com/rashed", "rashed.heritage@gmail.com"],
    ["لينا السعد", "كمانجية", "موسيقى حجازية", "https://instagram.com/lina_violin", "جدة", "عروض كلاسيكية", "https://spotify.com/lina", "lina.violin@gmail.com"],
    ["عمر الشهري", "باص جيتار", "جاز عربي", "https://soundcloud.com/omar_bass", "أبها", "فرق جاز", "https://reverbnation.com/omar", "omar.bass@gmail.com"]
];

const SAMPLE_OPPORTUNITIES = [
    ["مهرجان الرياض للموسيقى", "منظم فعاليات", "جميع الأنواع", "https://riyadh-music-fest.com", "الرياض", "بحث عن فنانين", "https://apply.riyadhfest.com", "info@riyadhfest.com"],
    ["استوديو النغم الذهبي", "مدير استوديو", "تسجيل وإنتاج", "https://instagram.com/golden_note_studio", "جدة", "خدمات تسجيل", "https://goldennote.studio", "booking@goldennote.studio"],
    ["أكاديمية الموسيقى السعودية", "مدير أكاديمي", "تعليم موسيقي", "https://saudimusicacademy.edu.sa", "الرياض", "مدرسين موسيقى", "https://careers.sma.edu.sa", "hr@saudimusicacademy.edu.sa"],
    ["شركة إنتاج الأحلام", "منتج تنفيذي", "إنتاج ألبومات", "https://dreamsproduction.sa", "الخبر", "مطربين جدد", "https://submit.dreams.sa", "talent@dreamsproduction.sa"],
    ["مهرجان جدة للجاز", "منسق موسيقي", "جاز وبلوز", "https://jeddahjazzfest.com", "جدة", "عازفين جاز", "https://apply.jjf.com", "artists@jeddahjazzfest.com"],
    ["قناة الموسيقى العربية", "مدير البرامج", "تلفزيوني", "https://arabicmusictv.com", "الدمام", "ضيوف برامج", "https://tv.arabic.com/guests", "programs@arabicmusictv.com"],
    ["مسرح الأوبرا السعودي", "مدير فني", "كلاسيكي وأوبرا", "https://saudiopera.org", "الرياض", "مطربين أوبرا", "https://auditions.opera.sa", "casting@saudiopera.org"],
    ["استوديو الإبداع الموسيقي", "مهندس صوت", "جميع الأنواع", "https://creativestudio.sa", "الطائف", "مشاريع تسجيل", "https://book.creative.sa", "studio@creativestudio.sa"]
];

// Data access functions (mimicking Apps Script functions)
function getAllArtists() {
    return SAMPLE_ARTISTS;
}

function getAllOpportunities() {
    return SAMPLE_OPPORTUNITIES;
}

function searchArtists(filters) {
    if (!filters || filters.length === 0) {
        return SAMPLE_ARTISTS;
    }
    
    const hasFilters = filters.some(filter => {
        const trimmed = String(filter || '').trim();
        return trimmed !== '';
    });
    
    if (!hasFilters) {
        return SAMPLE_ARTISTS;
    }
    
    return SAMPLE_ARTISTS.filter(row => {
        return filters.every((filter, index) => {
            const trimmedFilter = String(filter || '').trim();
            
            if (trimmedFilter === '') {
                return true;
            }
            
            const cellValue = String(row[index] || '').toLowerCase();
            const filterValue = trimmedFilter.toLowerCase();
            
            // Enhanced partial word matching
            const searchWords = filterValue.split(/\s+/).filter(word => word.length > 0);
            
            return searchWords.every(searchWord => {
                return cellValue.includes(searchWord);
            });
        });
    });
}

// Cache simulation for performance
const dataCache = {
    artists: null,
    opportunities: null,
    lastUpdate: null
};

function getCachedData(type) {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    if (dataCache.lastUpdate && (now - dataCache.lastUpdate) < fiveMinutes) {
        return dataCache[type];
    }
    
    // Simulate loading delay
    return new Promise(resolve => {
        setTimeout(() => {
            if (type === 'artists') {
                dataCache.artists = getAllArtists();
                resolve(dataCache.artists);
            } else {
                dataCache.opportunities = getAllOpportunities();
                resolve(dataCache.opportunities);
            }
            dataCache.lastUpdate = now;
        }, 100); // Minimal delay to simulate network
    });
}