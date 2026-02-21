-- ADVANCED PERFORMANCE INDEXING (LMS SCALE)

-- 1. Composite Index for High-Concurrency Enrollment Checks
-- Optimizes: RLS subqueries, MediaService validation, and student course lookups.
-- Postgres can use the prefix (student_id) for queries filtering only by student.
CREATE INDEX IF NOT EXISTS idx_enrollments_student_course_status 
ON enrollments(student_id, course_id, status);

-- 2. Foreign Key & Status Lookups
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);

-- 3. Cleanup Redundant Indexes
-- idx_enrollments_student_id is now redundant due to the composite index prefix.
DROP INDEX IF EXISTS idx_enrollments_student_id;
