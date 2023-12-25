import { screen } from '@testing-library/react';
export function app() {
    return screen.getByRole('application');
}
export function previousButton() {
    return screen.getByRole('button', {
        name: 'Go to the Previous Month'
    });
}
export function nextButton() {
    return screen.getByRole('button', {
        name: 'Go to the Next Month'
    });
}
export function columnheader(name) {
    return screen.getByRole('columnheader', name ? { name } : undefined);
}
export function grid(name) {
    return screen.getByRole('grid', name ? { name } : undefined);
}
export function nav() {
    return nextButton().parentElement;
}
export function gridcell(date) {
    return screen.getByRole('gridcell', { name: String(date.getDate()) });
}
export function rowheader(name) {
    return screen.getByRole('rowheader', name ? { name } : undefined);
}
export function yearDropdown() {
    return screen.getByRole('combobox', { name: 'Year:' });
}
export function monthDropdown() {
    return screen.getByRole('combobox', { name: 'Month:' });
}
export function activeElement() {
    if (!document.activeElement) {
        throw new Error('Could not find any focused element');
    }
    return document.activeElement;
}
