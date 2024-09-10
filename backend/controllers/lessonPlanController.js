const { generateLessonPlan } = require('../utils/generateLessonPlan');
const LessonPlan = require('../models/LessonPlan');
const PDFDocument = require('pdfkit');
const { Writable } = require('stream');

const createLessonPlan = async (req, res) => {
  const { topic, gradeLevel, language } = req.body;
  const userId = req.session.user ? req.session.user._id : null;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    let lessonPlanContent = await generateLessonPlan(topic, gradeLevel, language);

    lessonPlanContent = lessonPlanContent.replace(/[*#]/g, '');

    const lessonPlan = new LessonPlan({
      topic,
      gradeLevel,
      language,
      createdAt: new Date(),
      content: lessonPlanContent, 
      user: userId 
    });

    const doc = new PDFDocument();
    doc.fontSize(5); 
    const lineHeight = 5;  
    const lineGap = 2;  

    let buffers = [];
    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        buffers.push(chunk);
        callback();
      }
    });

    doc.pipe(writableStream);

    const lines = lessonPlanContent.split('\n');
    const icon = '-';

    lines.forEach((line, index) => {
      if (line.trim() === '') {
        doc.moveDown(0.5); 
      } else {
        doc.text(`${icon} ${line}`, {
          width: 410,
          align: 'left',
          continued: false,
          indent: 20,
          lineGap: lineGap 
        });

        doc.moveDown(lineGap / lineHeight);  
      }

      if (doc.y > 700 && index < lines.length - 1) {
        doc.addPage();
      }
    });

    doc.end();

    writableStream.on('finish', async () => {
      lessonPlan.pdf = Buffer.concat(buffers);
      await lessonPlan.save();
      res.json({ message: 'Lesson plan generated and saved as PDF', lessonPlan });
    });
  } catch (error) {
    console.error('Error generating lesson plan:', error);
    res.status(500).json({ message: 'An error occurred while generating the lesson plan' });
  }
};


const getUserLessonPlans = async (req, res) => {
  const userId = req.session.user ? req.session.user._id : null;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const lessonPlans = await LessonPlan.find({ user: userId }).select('topic gradeLevel language pdf content');
    res.status(200).json(lessonPlans);
  } catch (error) {
    console.error('Error fetching lesson plans:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteLessonPlan = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user ? req.session.user._id : null;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const lessonPlan = await LessonPlan.findOneAndDelete({ _id: id, user: userId });
    if (!lessonPlan) {
      return res.status(404).json({ message: 'Lesson plan not found' });
    }
    res.json({ message: 'Lesson plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting lesson plan:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createLessonPlan, getUserLessonPlans, deleteLessonPlan };
