// University Model
const UniversitySchema = new Schema({
  name: String,
  schools: [{ type: Schema.Types.ObjectId, ref: "School" }],
});

const University = mongoose.model("University", UniversitySchema);

// School Model
const SchoolSchema = new Schema({
  name: String,
  classrooms: [{ type: Schema.Types.ObjectId, ref: "Classroom" }],
  classes: [{ type: Schema.Types.ObjectId, ref: "Class" }],
  libraries: [{ type: Schema.Types.ObjectId, ref: "Library" }],
  financials: [{ type: Schema.Types.ObjectId, ref: "Financial" }],
});

const School = mongoose.model("School", SchoolSchema);

// Classroom Model
const ClassroomSchema = new Schema({
  name: String,
});

const Classroom = mongoose.model("Classroom", ClassroomSchema);

// Class Model
const ClassSchema = new Schema({
  name: String,
  examinations: [{ type: Schema.Types.ObjectId, ref: "Examination" }],
  programs: [{ type: Schema.Types.ObjectId, ref: "Program" }],
});

const Class = mongoose.model("Class", ClassSchema);

// Examination Model
const ExaminationSchema = new Schema({
  // Examination properties
});

const Examination = mongoose.model("Examination", ExaminationSchema);

// Program Model
const ProgramSchema = new Schema({
  // Program properties
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
});

const Program = mongoose.model("Program", ProgramSchema);

// Subject Model
const SubjectSchema = new Schema({
  // Subject properties
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const Subject = mongoose.model("Subject", SubjectSchema);

// Student Model
const StudentSchema = new Schema({
  // Student properties
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  parents: [{ type: Schema.Types.ObjectId, ref: "Parent" }],
});

const Student = mongoose.model("Student", StudentSchema);

// Teacher Model
const TeacherSchema = new Schema({
  // Teacher properties
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

// Course Model
const CourseSchema = new Schema({
  // Course properties
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
});

const Course = mongoose.model("Course", CourseSchema);

// Library Model
const LibrarySchema = new Schema({
  // Library properties
  resources: [{ type: Schema.Types.ObjectId, ref: "Resource" }],
});

const Library = mongoose.model("Library", LibrarySchema);

// Resource Model
const ResourceSchema = new Schema({
  // Resource properties
});

const Resource = mongoose.model("Resource", ResourceSchema);

// Financial Model
const FinancialSchema = new Schema({
  // Financial properties
  fees: [{ type: Schema.Types.ObjectId, ref: "Fee" }],
});

const Financial = mongoose.model("Financial", FinancialSchema);

// Fee Model
const FeeSchema = new Schema({
  // Fee properties
  payments: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
});

const Fee = mongoose.model("Fee", FeeSchema);

// Payment Model
const PaymentSchema = new Schema({
  // Payment properties
});

const Payment = mongoose.model("Payment", PaymentSchema);
