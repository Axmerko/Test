import type { Reporter, Vitest } from 'vitest';

export default class PointsReporter implements Reporter {
    private ctx!: Vitest;

    onInit(ctx: Vitest) {
        this.ctx = ctx;
    }

    onFinished(files: any, errors: any) {
        const TEST_AMOUNT = 10; // Change based on syllabus test total points


        let totalPoints = 0;
        let earnedPoints = 0;

        // Recursively traverse all tests
        const processTask = (task: any, depth = 0) => {
            if (task.type === 'test') {
                // Extract points from test name - supports decimals like [0.5pts]
                const match = task.name.match(/\[(\d+\.?\d*)pts?\]/i);
                const points = match ? parseFloat(match[1]) : 0;

                if (points > 0) {
                    totalPoints += points;
                    if (task.result?.state === 'pass') {
                        earnedPoints += points;
                    }
                }
            }

            // Process nested tasks
            if (task.tasks && task.tasks.length > 0) {
                task.tasks.forEach((t: any) => processTask(t, depth + 1));
            }
        };

        // Process all test files
        if (files && files.length > 0) {
            files.forEach((file: any) => {
                processTask(file, 0);
            });
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📊 Points: ${earnedPoints}/${totalPoints}`);
        if (totalPoints > 0) {
            const percentage = ((earnedPoints / totalPoints) * 100).toFixed(1);
            console.log(`🎯 Score: ${percentage}% => ${((earnedPoints / totalPoints) * TEST_AMOUNT).toFixed(0)}/${TEST_AMOUNT} points rewarded`);}
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
}