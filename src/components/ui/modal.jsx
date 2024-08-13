'use client';

import React from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';

function Modal({ title, isOpen, children, onClose, description }) {
    const handleOpenChange = (open) => {
        if (!open) {
            onClose();
        }
    };

    return (
       <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
       </Dialog>
    );
}

export default Modal;
