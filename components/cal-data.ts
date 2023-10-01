type Week = {
  weektitle: string;
  days: string[][];
};

export const cal_startDate: string = "2023-10-01T00:00:00.000Z";
export const cal_offset = 17;
//make sure days are = 7
export const weekData: Week[] = [
  {
    weektitle: "Week 1 | Math Fundamentals",
    days: [
      ["Vectors"],
      ["Vectors Cont.", "Linear Combinations", "<u>MIDWEEK 1</u>"],
      ["Linear Transformation", "Matrices"],
      ["Calculus Derivative", "<u>MIDWEEK 2</u>"],
      ["Calculus Integral"],
      ["Chain Rule", "Gradient & Jacobian"],
      ["<u>WEEK QUIZ</u>"],
    ],
  },
  {
    weektitle: "Week 2 | Python Fundamentals",
    days: [
      ["Data Types", "Operators", "Data Structures"],
      ["Control Flow", "<u>MIDWEEK 1</u>"],
      ["Functions"],
      ["Scripting", "<u>MIDWEEK 2</u>"],
      ["Object Oriented Programming"],
      ["Object Oriented Programming"],
      ["<u>WEEK QUIZ</u>"],
    ],
  },
  {
    weektitle: "Week 3 | Python Project",
    days: [
      ["Project Introduction"],
      ["Timing", "Command Line Arguments"],
      ["Creating Pet Image Labels", "Classifying Images"],
      ["Calculating Results", "Classify Uploaded Images"],
      ["Final Touches", "<u>PROJECT SUBMISSION</u>"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 4 | Numpy, Pandas, Matplotlib",
    days: [
      ["Anaconda", "Jupyter"],
      ["Numpy"],
      ["Pandas", "<u>MIDWEEK 1</u>"],
      ["Matplotlib"],
      ["Seaborn", "<u>MIDWEEK 2</u>"],
      ["Seaborn"],
      ["<u>WEEK QUIZ</u>"],
    ],
  },
  {
    weektitle: "Week 5 | Machine Learning",
    days: [
      ["Intro to Supervised", "Linear Regression"],
      ["Perceptron Algorithm", "Decision Trees", "<u>MIDWEEK 1</u>"],
      ["Naive Bayes", "Support Vector Machines"],
      ["Ensemble Methods", "<u>MIDWEEK 2</u>"],
      ["Model Evaluation"],
      ["Training & Tuning"],
      ["<u>WEEK QUIZ</u>"],
    ],
  },
  {
    weektitle: "Week 6 | Finding Donors ML Project",
    days: [
      ["Exploring the Data"],
      ["Preparing the Data"],
      ["Evaluating Model Performance"],
      ["Improving Results"],
      ["Feature Importance", "<u>PROJECT SUBMISSION</u>"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 7 | Deep Learning Week I",
    days: [
      ["Introduction to Deep Learning for Computer Vision"],
      ["Image Classification", "<u>MIDWEEK 1</u>"],
      ["Linear Classifiers"],
      ["Linear Classifiers", "<u>MIDWEEK 2</u>"],
      ["Optimization"],
      ["Optimization"],
      ["<u>WEEK QUIZ</u>"],
    ],
  },
  {
    weektitle: "Week 8 | Deep Learning Week II",
    days: [
      ["Neural Networks"],
      ["Neural Networks"],
      ["Backpropagation", "<u>MIDWEEK 1</u>"],
      ["Backpropagation"],
      ["Convolutional Networks", "<u>MIDWEEK 2</u>"],
      ["CNN Architectures"],
      ["<u>WEEK QUIZ</u>"],
    ],
  },
  {
    weektitle: "Week 9 | Assignment I",
    days: [
      ["Python", "Pytorch"],
      ["Pytorch"],
      ["kNN"],
      ["kNN"],
      ["kNN", "<u>ASSIGNMENT SUBMISSION</u>"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 10 | Deep Learning Week III",
    days: [
      ["Hardware & Software"],
      ["Training Neural Networks I"],
      ["Training Neural Networks I", "<u>MIDWEEK 1</u>"],
      ["Training Neural Networks II"],
      ["Training Neural Networks II"],
      ["Training Neural Networks II", "<u>MIDWEEK 2</u>"],
      ["<u>WEEK QUIZ</u>"],
    ],
  },
  {
    weektitle: "Week 11 | CIFAR10 Restricted Competition",
    days: [
      [],
      [],
      ["One-Submission Deadline"],
      [],
      ["NOTEBOOK SUBMISSION"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 12 | Assignment II",
    days: [
      ["Linear Classifier"],
      ["Linear Classifier"],
      ["Two Layer Net"],
      ["Two Layer Net"],
      ["Two Layer Net", "<u>ASSIGNMENT SUBMISSION</u>"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 13 | CIFAR10 Unrestricted Competition",
    days: [
      [],
      [],
      ["One-Submission Deadline"],
      [],
      ["NOTEBOOK SUBMISSION"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 14 | Assignment III",
    days: [
      ["Fully Connected Networks"],
      ["Fully Connected Networks"],
      ["Convolutional Networks"],
      ["Convolutional Networks"],
      ["Convolutional Networks", "<u>ASSIGNMENT SUBMISSION</u>"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 15 | Plant Binary Classification Competition",
    days: [
      [],
      [],
      ["One-Submission Deadline"],
      [],
      ["NOTEBOOK SUBMISSION"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 16 | CIFAR100 Competition",
    days: [
      [],
      [],
      ["One-Submission Deadline"],
      [],
      ["NOTEBOOK SUBMISSION"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 17 | Deep Learning Week IV",
    days: [
      ["Recurrent Neural Networks"],
      ["Recurrent Neural Networks", "<u>MIDWEEK 1</u>"],
      ["Attention"],
      ["Attention"],
      ["Attention", "<u>MIDWEEK 2</u>"],
      ["Visualizing & Understanding"],
      ["<u>WEEK QUIZ</u>"],
    ],
  },
  {
    weektitle: "Week 18 | Audio Age Capture Competition",
    days: [
      [],
      [],
      ["One-Submission Deadline"],
      [],
      ["NOTEBOOK SUBMISSION"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 19 | Assignment IV",
    days: [
      ["Pytorch Autograd"],
      ["Pytorch Autograd"],
      ["Image Captioning with Recurrent Neural Networks"],
      ["Image Captioning with Recurrent Neural Networks"],
      [
        "Network Visualization",
        "Style Transfer",
        "<u>ASSIGNMENT SUBMISSION</u>",
      ],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 20 | Grade Prediction Tool Competition",
    days: [
      [],
      [],
      ["One-Submission Deadline"],
      [],
      ["NOTEBOOK SUBMISSION"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 21 | Deep Learning Week V",
    days: [
      ["Object Detection"],
      ["Object Detection", "<u>MIDWEEK 1</u>"],
      ["Detection & Segmentation"],
      ["Detection & Segmentation"],
      ["Detection & Segmentation", "<u>MIDWEEK 2</u>"],
      ["Detection & Segmentation"],
      ["<u>WEEK QUIZ</u>"],
    ],
  },
  {
    weektitle: "Week 22 | Carvana Segmentation Competition",
    days: [
      [],
      [],
      ["One-Submission Deadline"],
      [],
      ["NOTEBOOK SUBMISSION"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 23 | Assignment V",
    days: [
      ["Single-Stage Detector"],
      ["Single-Stage Detector"],
      ["Two-Stage Detector"],
      ["Two-Stage Detector"],
      ["Two-Stage Detector", "<u>ASSIGNMENT SUBMISSION</u>"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Week 24 | Time Forecasting Competition",
    days: [
      [],
      [],
      ["One-Submission Deadline"],
      [],
      ["NOTEBOOK SUBMISSION"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Bonus Week 25 | Baheya Breast Tumor Detection (Few-Shot)",
    days: [
      [],
      [],
      ["One-Submission Deadline"],
      [],
      ["NOTEBOOK SUBMISSION"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
  {
    weektitle: "Bonus Week 26 | Course Retention",
    days: [
      [],
      [],
      ["One-Submission Deadline"],
      [],
      ["NOTEBOOK SUBMISSION"],
      ["<u>GRADING</u>"],
      ["<u>GRADING</u>"],
    ],
  },
];